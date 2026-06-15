// database.js - PostgreSQL Database Setup (for Supabase)

const { Pool } = require('pg');
require('dotenv').config();

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

module.exports = pool;
