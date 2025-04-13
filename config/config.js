/**
 * Application configuration
 * Loads and validates environment variables
 */

require('dotenv').config();

// Helper function to validate required environment variables
const requiredEnvVar = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

// Helper to parse comma-separated values into an array
const parseArrayFromEnv = (value) => value.split(',').map(item => item.trim());

// Server configuration
const SERVER_CONFIG = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: (process.env.NODE_ENV || 'development') === 'development',
};

// Anthropic API configuration
const ANTHROPIC_CONFIG = {
  apiKey: requiredEnvVar('ANTHROPIC_API_KEY'),
};

// CORS configuration
const CORS_CONFIG = {
  allowedOrigins: process.env.ALLOWED_ORIGINS 
    ? parseArrayFromEnv(process.env.ALLOWED_ORIGINS)
    : ['http://localhost:3000'],
};

// Rate limiting configuration
const RATE_LIMIT_CONFIG = {
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '30000', 10),  // Default: 30 seconds
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '1', 10),        // Default: 1 request per window
};

module.exports = {
  SERVER_CONFIG,
  ANTHROPIC_CONFIG,
  CORS_CONFIG,
  RATE_LIMIT_CONFIG,
}; 