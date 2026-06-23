// database.js - PostgreSQL Database Setup (for Supabase)

const { Pool } = require('pg');
require('dotenv').config();
const bcrypt = require('bcrypt');

// Initialize the PostgreSQL connection pool using the connection string from .env
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { 
        rejectUnauthorized: false // Required for connecting securely to cloud databases like Supabase
    }
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('❌ Failed to connect to Supabase PostgreSQL database:', err.message);
    } else {
        console.log('📂 Connected to Supabase PostgreSQL database successfully!');
    }
});

// Create tables sequentially on startup if they do not exist
const createSubscribersTable = `
    CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

const createInquiriesTable = `
    CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        inquiry_type VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

// Run table creation scripts
pool.query(createSubscribersTable, (err) => {
    if (err) {
        console.error('❌ Error creating subscribers table:', err.message);
    } else {
        console.log('✅ Subscribers table ready on Supabase.');
    }
});

pool.query(createInquiriesTable, (err) => {
    if (err) {
        console.error('❌ Error creating inquiries table:', err.message);
    } else {
        console.log('✅ Inquiries table ready on Supabase.');
    }
});

const createReviewsTable = `
    CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        city_key VARCHAR(100) NOT NULL,
        name VARCHAR(255) NOT NULL,
        rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
        comment TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

pool.query(createReviewsTable, (err) => {
    if (err) {
        console.error('❌ Error creating reviews table:', err.message);
    } else {
        console.log('✅ Reviews table ready on Supabase.');
    }
});

const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

pool.query(createUsersTable, (err) => {
    if (err) {
        console.error('❌ Error creating users table:', err.message);
    } else {
        console.log('✅ Users table ready on Supabase.');
        checkAndCreateAdmin();
    }
});

function checkAndCreateAdmin() {
    const adminEmail = 'admin@miles.com';
    const checkSql = 'SELECT * FROM users WHERE email = $1';
    
    pool.query(checkSql, [adminEmail], (err, result) => {
        if (err) {
            console.error('❌ Error checking default admin account:', err.message);
            return;
        }
        
        if (result.rows.length === 0) {
            const defaultPassword = 'admin123';
            const saltRounds = 10;
            
            bcrypt.hash(defaultPassword, saltRounds, (hashErr, hash) => {
                if (hashErr) {
                    console.error('❌ Error hashing default admin password:', hashErr.message);
                    return;
                }
                
                const insertSql = `
                    INSERT INTO users (username, email, password_hash, role)
                    VALUES ($1, $2, $3, $4)
                `;
                pool.query(insertSql, ['Admin', adminEmail, hash, 'admin'], (insertErr) => {
                    if (insertErr) {
                        console.error('❌ Error creating default admin account:', insertErr.message);
                    } else {
                        console.log('👑 Default administrator account created successfully! (admin@miles.com / admin123)');
                    }
                });
            });
        } else {
            console.log('👑 Default administrator account is ready.');
        }
    });
}

module.exports = pool;
