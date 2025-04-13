/**
 * Input validation middleware
 * 
 * Validates incoming request data for the generate-report endpoint.
 * Ensures that all required fields are present and properly formatted
 * before passing the request to the controller.
 */

const { body, validationResult } = require('express-validator');

// Validation rules
const validationRules = [
  // Validate the content field
  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .isString()
    .withMessage('Content must be a string')
    .trim(),
];

// Validation middleware
const validateInput = [
  // Apply all validation rules
  ...validationRules,
  
  // Process validation results
  (req, res, next) => {
    const errors = validationResult(req);
    
    // If there are validation errors, return an error response
    if (!errors.isEmpty()) {
      return res.status(400).json({
        data: null,
        error: errors.array()[0].msg, // Return the first error message
        success: false,
      });
    }
    
    // If validation passes, continue to the next middleware
    next();
  },
];

module.exports = validateInput; 