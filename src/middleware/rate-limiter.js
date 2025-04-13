/**
 * Rate limiter middleware
 * 
 * Restricts the number of requests a client can make within a given time window.
 * Used to prevent abuse of the API and manage costs associated with LLM API calls.
 */

const rateLimit = require('express-rate-limit');
const { RATE_LIMIT_CONFIG } = require('../../config/config');

// Create a rate limiter middleware
const limiter = rateLimit({
  windowMs: RATE_LIMIT_CONFIG.windowMs,
  max: RATE_LIMIT_CONFIG.max,
  message: {
    data: null,
    error: `Rate limit exceeded. Please try again in ${Math.ceil(RATE_LIMIT_CONFIG.windowMs / 1000)} seconds.`,
    success: false,
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = limiter; 