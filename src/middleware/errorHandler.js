const errorHandler = (err, req, res, next) => {
    console.error(err); // Log the full error to the console for debugging

    const statusCode = err.statusCode || 500;
    const message = err.message || 'An unexpected server error occurred.';

    // Send a structured error response to the client
    res.status(statusCode).json({
        error: message,
        details: err.details || null, // Include extra details if available
    });
};

module.exports = errorHandler;