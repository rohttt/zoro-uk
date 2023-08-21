const rateLimit = require('express-rate-limit');

exports.signupLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limiting each IP to 10 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res, next) => {
        res.status(401).json({ success: false, message: "Too many requests, Please try again after sometime." })
    }
})

exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 3 minutes
    max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res, next) => {
        res.status(401).json({ success: false, message: "Too many requests, Please try again after sometime." })
    }
})