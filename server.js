// server.js - Main Express Application Server

const express = require('express');
const db = require('./database');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and form-urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Configuration for User Authentication
app.use(session({
    secret: 'miles-and-moments-secret-key-12345',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // set to true if running on HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// =========================================================================
// API Rate Limiting & Spam Prevention (Backend Security)
// =========================================================================

// In-memory store: IP -> Array of timestamps
const rateLimitMap = new Map();

// Background task running every 5 minutes to clean up stale entries (prevents memory leaks)
setInterval(() => {
    const now = Date.now();
    const cleanupWindowMs = 10 * 60 * 1000; // 10 minutes
    for (const [ip, timestamps] of rateLimitMap.entries()) {
        const validTimestamps = timestamps.filter(t => now - t < cleanupWindowMs);
        if (validTimestamps.length === 0) {
            rateLimitMap.delete(ip);
        } else {
            rateLimitMap.set(ip, validTimestamps);
        }
    }
}, 5 * 60 * 1000);

/**
 * Express Rate Limiting Middleware Factory
 * @param {number} maxRequests - Max requests allowed in the timeframe
 * @param {number} windowMinutes - Timeframe window in minutes
 */
function createRateLimiter(maxRequests, windowMinutes) {
    const windowMs = windowMinutes * 60 * 1000;
    return (req, res, next) => {
        // Retrieve client IP address
        const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const now = Date.now();

        if (!rateLimitMap.has(ip)) {
            rateLimitMap.set(ip, []);
        }

        const timestamps = rateLimitMap.get(ip);
        
        // Remove timestamps older than the window
        const activeRequests = timestamps.filter(t => now - t < windowMs);

        if (activeRequests.length >= maxRequests) {
            const oldestRequest = activeRequests[0];
            const resetTimeMs = oldestRequest + windowMs;
            const secondsLeft = Math.ceil((resetTimeMs - now) / 1000);

            // Set standardized rate limiting headers
            res.setHeader('Retry-After', secondsLeft);
            res.setHeader('X-RateLimit-Limit', maxRequests);
            res.setHeader('X-RateLimit-Remaining', 0);
            res.setHeader('X-RateLimit-Reset', Math.ceil(resetTimeMs / 1000));

            return res.status(429).json({
                success: false,
                message: `Too many submissions. Please wait ${secondsLeft} seconds before trying again.`
            });
        }

        // Add current timestamp
        activeRequests.push(now);
        rateLimitMap.set(ip, activeRequests);

        // Set tracking headers
        res.setHeader('X-RateLimit-Limit', maxRequests);
        res.setHeader('X-RateLimit-Remaining', maxRequests - activeRequests.length);
        res.setHeader('X-RateLimit-Reset', Math.ceil((now + windowMs) / 1000));

        next();
    };
}


// Serve all static files from the root directory (HTML, CSS, JS, Images)
app.use(express.static(path.join(__dirname)));

// Default route redirects to the home page (new1.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'new1.html'));
});

// =========================================================================
// Server-Sent Events (SSE) - Real-Time Admin Notifications
// =========================================================================

// Array to hold connected admin SSE clients
const sseClients = [];

/**
 * Broadcasts an event to all connected admin SSE clients
 * @param {string} eventType - The event name (e.g. 'new_inquiry', 'new_subscriber')
 * @param {object} payload - The data to send
 */
function broadcastToAdmins(eventType, payload) {
    const data = JSON.stringify({ type: eventType, ...payload });
    sseClients.forEach(client => {
        client.write(`event: ${eventType}\n`);
        client.write(`data: ${data}\n\n`);
    });
}

/**
 * API Endpoint: GET /api/admin/events
 * SSE stream that pushes real-time notifications to the admin dashboard
 */
app.get('/api/admin/events', (req, res) => {
    // Verify admin session before establishing SSE connection
    if (!req.session || !req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Unauthorized.' });
    }

    // Set SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // Disable buffering for Nginx proxies
    res.flushHeaders();

    // Send initial heartbeat so the client knows the connection is alive
    res.write(`event: connected\ndata: ${JSON.stringify({ message: 'SSE connection established' })}\n\n`);

    // Register this client
    sseClients.push(res);
    console.log(`📡 Admin SSE client connected. Total active: ${sseClients.length}`);

    // Remove client on disconnect
    req.on('close', () => {
        const index = sseClients.indexOf(res);
        if (index !== -1) sseClients.splice(index, 1);
        console.log(`📡 Admin SSE client disconnected. Total active: ${sseClients.length}`);
    });
});

/**
 * API Endpoint: POST /api/subscribe
 * Registers email addresses for the travel newsletter on Supabase
 */
app.post('/api/subscribe', createRateLimiter(3, 5), (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    // PostgreSQL uses $1 instead of ? for parameters
    const sql = 'INSERT INTO subscribers (email) VALUES ($1)';
    
    db.query(sql, [email.trim().toLowerCase()], (err, result) => {
        if (err) {
            // Handle PostgreSQL unique constraint violation (error code 23505)
            if (err.code === '23505') {
                return res.status(409).json({ 
                    success: false, 
                    message: 'This email is already registered in our database!' 
                });
            }
            console.error('❌ Database error inserting subscriber:', err.message);
            return res.status(500).json({ success: false, message: 'Internal server database error.' });
        }
        
        console.log(`✉️ New newsletter subscriber added: ${email}`);

        // Broadcast real-time notification to admin dashboard
        broadcastToAdmins('new_subscriber', {
            email: email.trim().toLowerCase(),
            timestamp: new Date().toISOString()
        });

        return res.status(201).json({ 
            success: true, 
            message: 'Thank you for subscribing! Your email has been added to our list.' 
        });
    });
});

/**
 * API Endpoint: POST /api/inquiry
 * Logs tour and travel package inquiries from the contact form
 */
app.post('/api/inquiry', createRateLimiter(3, 5), (req, res) => {
    const { name, email, inquiry_type, message } = req.body;

    if (!name || !email || !inquiry_type || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'All fields (name, email, inquiry type, and message) are required.' 
        });
    }

    // PostgreSQL parameters mapping
    const sql = 'INSERT INTO inquiries (name, email, inquiry_type, message) VALUES ($1, $2, $3, $4)';
    const params = [name.trim(), email.trim().toLowerCase(), inquiry_type, message.trim()];
    
    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('❌ Database error inserting inquiry:', err.message);
            return res.status(500).json({ success: false, message: 'Internal server database error.' });
        }

        console.log(`📝 New travel inquiry logged for package "${inquiry_type}" by ${name} (${email})`);

        // Broadcast real-time notification to admin dashboard
        broadcastToAdmins('new_inquiry', {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            inquiry_type: inquiry_type,
            timestamp: new Date().toISOString()
        });

        return res.status(201).json({ 
            success: true, 
            message: 'Inquiry received! Our travel planning team has logged your query.' 
        });
    });
});

/**
 * API Endpoint: GET /api/admin/subscribers
 * Retrieves list of all travel newsletter subscribers (Admin view)
 */
app.get('/api/admin/subscribers', (req, res) => {
    // Restrict access to administrators only
    if (!req.session || !req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Unauthorized. Administrator access required.' });
    }
    const sql = 'SELECT * FROM subscribers ORDER BY subscribed_at DESC';
    db.query(sql, [], (err, result) => {
        if (err) {
            console.error('❌ Database error fetching subscribers:', err.message);
            return res.status(500).json({ success: false, message: 'Failed to fetch subscribers.' });
        }
        // PostgreSQL returns rows inside result.rows
        return res.json({ success: true, subscribers: result.rows });
    });
});

/**
 * API Endpoint: GET /api/admin/inquiries
 * Retrieves list of all travel package inquiries (Admin view)
 */
app.get('/api/admin/inquiries', (req, res) => {
    // Restrict access to administrators only
    if (!req.session || !req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Unauthorized. Administrator access required.' });
    }
    const sql = 'SELECT * FROM inquiries ORDER BY submitted_at DESC';
    db.query(sql, [], (err, result) => {
        if (err) {
            console.error('❌ Database error fetching inquiries:', err.message);
            return res.status(500).json({ success: false, message: 'Failed to fetch inquiries.' });
        }
        // PostgreSQL returns rows inside result.rows
        return res.json({ success: true, inquiries: result.rows });
    });
});

// Helper function to prevent Cross-Site Scripting (XSS)
function escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') return '';
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * API Endpoint: POST /api/reviews
 * Submits a rating and comment for a specific city destination
 */
app.post('/api/reviews', (req, res) => {
    const { city_key, name, rating, comment } = req.body;

    if (!city_key || !name || !rating || !comment) {
        return res.status(400).json({ success: false, message: 'All fields (city, name, rating, and comment) are required.' });
    }

    const parsedRating = parseInt(rating, 10);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
        return res.status(400).json({ success: false, message: 'Rating must be a number between 1 and 5.' });
    }

    const sanitizedName = escapeHtml(name.trim());
    const sanitizedComment = escapeHtml(comment.trim());
    const cityKeyClean = city_key.trim().toLowerCase();

    const sql = 'INSERT INTO reviews (city_key, name, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *';
    const params = [cityKeyClean, sanitizedName, parsedRating, sanitizedComment];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('❌ Database error inserting review:', err.message);
            return res.status(500).json({ success: false, message: 'Internal server database error.' });
        }

        console.log(`⭐ New review added for city "${cityKeyClean}" by ${sanitizedName} (Rating: ${parsedRating})`);
        return res.status(201).json({ 
            success: true, 
            message: 'Review submitted successfully!',
            review: result.rows[0]
        });
    });
});

/**
 * API Endpoint: GET /api/reviews/:city_key
 * Retrieves list of all reviews for a specific city destination
 */
app.get('/api/reviews/:city_key', (req, res) => {
    const { city_key } = req.params;

    if (!city_key) {
        return res.status(400).json({ success: false, message: 'City parameter is required.' });
    }

    const cityKeyClean = city_key.trim().toLowerCase();
    const sql = 'SELECT id, name, rating, comment, created_at FROM reviews WHERE city_key = $1 ORDER BY created_at DESC';
    
    db.query(sql, [cityKeyClean], (err, result) => {
        if (err) {
            console.error('❌ Database error fetching reviews:', err.message);
            return res.status(500).json({ success: false, message: 'Failed to fetch reviews.' });
        }

        return res.json({ success: true, reviews: result.rows });
    });
});

// =========================================================================
// User Authentication Endpoints (Signup, Login, Logout, Session Check)
// =========================================================================

/**
 * API Endpoint: POST /api/auth/signup
 * Registers a new user account (default role 'user')
 */
app.post('/api/auth/signup', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields (username, email, password) are required.' });
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (hashErr, hash) => {
        if (hashErr) {
            console.error('❌ Error hashing user password:', hashErr.message);
            return res.status(500).json({ success: false, message: 'Server error encrypting password.' });
        }

        const sql = 'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, role';
        
        db.query(sql, [username.trim(), email.trim().toLowerCase(), hash], (err, result) => {
            if (err) {
                if (err.code === '23505') {
                    const message = err.detail.includes('email') 
                        ? 'This email address is already registered!' 
                        : 'This username is already taken. Please choose another.';
                    return res.status(409).json({ success: false, message });
                }
                console.error('❌ Database error registering user:', err.message);
                return res.status(500).json({ success: false, message: 'Failed to create user account.' });
            }

            const newUser = result.rows[0];
            
            // Automatically establish session on signup
            req.session.user = {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            };

            console.log(`👤 New traveler registered: ${newUser.username} (${newUser.email})`);
            return res.status(201).json({ 
                success: true, 
                message: 'Account created successfully! Welcome onboard.',
                user: req.session.user
            });
        });
    });
});

/**
 * API Endpoint: POST /api/auth/login
 * Validates credentials and creates a session cookie
 */
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const sql = 'SELECT * FROM users WHERE email = $1';
    db.query(sql, [email.trim().toLowerCase()], (err, result) => {
        if (err) {
            console.error('❌ Database error checking credentials:', err.message);
            return res.status(500).json({ success: false, message: 'Internal server database error.' });
        }

        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        const user = result.rows[0];

        bcrypt.compare(password, user.password_hash, (compareErr, isMatch) => {
            if (compareErr) {
                console.error('❌ Password comparison error:', compareErr.message);
                return res.status(500).json({ success: false, message: 'Server error validating credentials.' });
            }

            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Invalid email or password.' });
            }

            // Create session
            req.session.user = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            };

            console.log(`🔑 User logged in: ${user.username} (Role: ${user.role})`);
            return res.json({ 
                success: true, 
                message: `Welcome back, ${user.username}!`,
                user: req.session.user
            });
        });
    });
});

/**
 * API Endpoint: POST /api/auth/logout
 * Destroys session and clears cookie
 */
app.post('/api/auth/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error('❌ Error destroying session:', err.message);
                return res.status(500).json({ success: false, message: 'Failed to log out.' });
            }
            res.clearCookie('connect.sid');
            return res.json({ success: true, message: 'Logged out successfully.' });
        });
    } else {
        return res.json({ success: true, message: 'No active session.' });
    }
});

/**
 * API Endpoint: GET /api/auth/me
 * Retrieves the currently logged-in user profile from session
 */
app.get('/api/auth/me', (req, res) => {
    if (req.session && req.session.user) {
        return res.json({ success: true, user: req.session.user });
    } else {
        return res.json({ success: false, message: 'No active session.' });
    }
});

// Start Express listening loop
app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 Miles & Moments travel blog server launched!`);
    console.log(`🌐 Address: http://localhost:${PORT}`);
    console.log(`💻 Open http://localhost:${PORT}/new1.html to view homepage.`);
    console.log(`======================================================\n`);
});
