/**
 * Main server file for the Anthropic Claude API Proxy
 * 
 * This server acts as a secure proxy for Anthropic Claude API calls
 * from a React frontend application, implementing security measures,
 * rate limiting, and proper error handling.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import the configuration
const { SERVER_CONFIG, CORS_CONFIG } = require('../config/config');

// Import routes
const reportRoutes = require('./routes/report.routes');

// Create Express app
const app = express();

// Apply security headers with Helmet
app.use(helmet());

// Setup CORS
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin is allowed
    if (CORS_CONFIG.allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    
    return callback(null, true);
  },
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Request logging middleware
if (SERVER_CONFIG.isDevelopment) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Parse JSON request bodies
app.use(express.json({ limit: '1mb' }));

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// API routes
app.use('/api', reportRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    data: null,
    error: SERVER_CONFIG.isDevelopment ? err.message : 'An unexpected error occurred',
    success: false,
  });
});

// Root route for health check
app.get('/', (req, res) => {
  res.json({
    message: 'Anthropic Claude API Proxy Server',
    status: 'OK',
    timestamp: new Date().toISOString(),
  });
});

// Start the server
const PORT = SERVER_CONFIG.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${SERVER_CONFIG.nodeEnv} mode`);
}); 