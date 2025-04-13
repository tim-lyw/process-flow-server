/**
 * Report Controller
 * 
 * Handles requests to generate reports using the Anthropic Claude API.
 * Processes user content and formats responses.
 */

const Anthropic = require('@anthropic-ai/sdk');
const { ANTHROPIC_CONFIG } = require('../../config/config');

// Initialize Anthropic client with API key from environment variables
const anthropic = new Anthropic({
  apiKey: ANTHROPIC_CONFIG.apiKey,
});

/**
 * Generate a report using Anthropic Claude API
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.content - The string containing both prompt and data
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with generated HTML or error message
 */
const generateReport = async (req, res, next) => {
  try {
    const { content } = req.body;
    
    // Call the Anthropic API
    const response = await anthropic.messages.create({
      model: 'claude-3-7-sonnet-20250219',
      max_tokens: 50000,
      temperature: 0.6, // Balance between creativity and determinism
      messages: [
        {
          role: 'user',
          content: content,
        },
      ],
    });
    
    // Extract the generated HTML content from the response
    const generatedContent = response.content[0].text;
    
    // Return the successful response
    return res.status(200).json({
      data: generatedContent,
      error: '',
      success: true,
    });
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    
    // If it's an Anthropic API error with status
    if (error.status) {
      return res.status(error.status).json({
        data: null,
        error: `Anthropic API error: ${error.message}`,
        success: false,
      });
    }
    
    // For other errors, pass to the global error handler
    return next(error);
  }
};

module.exports = {
  generateReport,
}; 