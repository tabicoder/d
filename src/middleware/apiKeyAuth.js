require('dotenv').config();

const apiKeyAuth = (req, res, next) => {
    // Allow GET requests to the root path without a key for health checks
    if (req.path === '/' && req.method === 'GET') {
        return next();
    }

    const rapidApiKey = req.header('X-RapidAPI-Proxy-Secret');
    const expectedSecret = process.env.RAPIDAPI_PROXY_SECRET;

    if (!expectedSecret) {
        console.error("RAPIDAPI_PROXY_SECRET is not set in the environment variables.");
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    if (rapidApiKey && rapidApiKey === expectedSecret) {
        // The request has been verified as coming from RapidAPI
        next();
    } else {
        // If the key is missing or incorrect, reject the request
        res.status(401).json({ error: 'Unauthorized. Invalid or missing API secret.' });
    }
};

module.exports = apiKeyAuth;