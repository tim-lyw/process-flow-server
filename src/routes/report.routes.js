/**
 * Report Routes
 * 
 * Defines the API routes for report generation using the Anthropic Claude API.
 * Applies middleware for rate limiting and input validation.
 */

const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const rateLimiter = require('../middleware/rate-limiter');
const validateInput = require('../middleware/validate-input');

/**
 * POST /api/generate-report
 * 
 * Endpoint to generate an HTML report using Anthropic Claude API
 * 
 * @body {string} prompt - The LLM instruction prompt
 * @body {Object} data - The JSON data to summarize in the report
 * @returns {Object} JSON with HTML content or error message
 */
router.post(
  '/generate-report',
  rateLimiter, // Apply rate limiting
  validateInput, // Validate request input
  reportController.generateReport // Process the request
);

module.exports = router; 