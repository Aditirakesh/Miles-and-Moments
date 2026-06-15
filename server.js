// server.js - Main Express Application Server

const express = require('express');
const db = require('./database');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and form-urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve all static files from the root directory (HTML, CSS, JS, Images)
app.use(express.static(path.join(__dirname)));

// Default route redirects to the home page (new1.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'new1.html'));
});

/**
 * API Endpoint: POST /api/subscribe
 * Registers email addresses for the travel newsletter on Supabase
 */
app.post('/api/subscribe', (req, res) => {
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
app.post('/api/inquiry', (req, res) => {
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

// Start Express listening loop
app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 Miles & Moments travel blog server launched!`);
    console.log(`🌐 Address: http://localhost:${PORT}`);
    console.log(`💻 Open http://localhost:${PORT}/new1.html to view homepage.`);
    console.log(`======================================================\n`);
});
