const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const formatRoutes = require('./api/routes/format');
const errorHandler = require('./middleware/errorHandler');
const apiKeyAuth = require('./middleware/apiKeyAuth');

const app = express();

// --- Security and Core Middleware ---
app.use(helmet()); // Set various security headers
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json({ limit: '5mb' })); // Parse JSON bodies, with a limit for large code files
app.use(express.urlencoded({ extended: true }));

// --- API Key Authentication Middleware ---
// This will protect all routes defined after it
app.use(apiKeyAuth);

// --- Rate Limiting ---
// Apply to all requests after auth. Adjust window and limit as needed for production.
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	standardHeaders: true,
	legacyHeaders: false,
    message: { error: 'Too many requests, please try again after 15 minutes.' }
});
app.use(limiter);


// --- API Routes ---
app.get('/', (req, res) => {
    res.json({ message: 'Code Formatter API is running. Use POST /api/v1/format to format code.' });
});
app.use('/api/v1/format', formatRoutes);


// --- Error Handling Middleware ---
// This should be the last middleware added
app.use(errorHandler);

module.exports = app;