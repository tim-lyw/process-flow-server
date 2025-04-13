# Process Flow Server

A secure Express server that acts as a proxy for Anthropic Claude API calls, specifically designed for a React report generation application.

## Features

- Securely proxies requests to Anthropic Claude 3.7 Sonnet API
- Protects API keys from exposure to client-side code
- Rate limiting to restrict usage (1 request per 30 seconds)
- Input validation and sanitization
- CORS support for secure cross-origin requests
- Comprehensive error handling

## API Endpoints

### POST /api/generate-report

Generates an HTML report based on the provided content.

**Request Body:**

```json
{
  "content": "Generate a sales report for Q2 2023 with the following data: {\"sales\": [{\"product\": \"Widget A\", \"amount\": 1200, \"region\": \"North\"}, {\"product\": \"Widget B\", \"amount\": 800, \"region\": \"South\"}], \"period\": \"Q2 2023\"}"
}
```

The `content` field should contain both your instruction prompt and the data to be processed by the LLM.

**Successful Response (200 OK):**

```json
{
  "data": "<div>Generated HTML content here...</div>",
  "error": "",
  "success": true
}
```

**Error Response (4xx/5xx):**

```json
{
  "data": null,
  "error": "Error message details",
  "success": false
}
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Anthropic API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/process-flow-server.git
   cd process-flow-server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the `.env.example`:
   ```
   cp .env.example .env
   ```

4. Add your Anthropic API key to the `.env` file:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

5. Start the server:
   ```
   npm run dev
   ```

The server will be available at http://localhost:3001.

### Production Deployment

For production environments:

1. Ensure all environment variables are properly set
2. Run using the production script:
   ```
   npm start
   ```

## Testing the API

You can test the API using curl:

```bash
curl -X POST http://localhost:3001/api/generate-report \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Generate a sales report for Q2 2023 with the following data: {\"sales\": [{\"product\": \"Widget A\", \"amount\": 1200, \"region\": \"North\"}, {\"product\": \"Widget B\", \"amount\": 800, \"region\": \"South\"}], \"period\": \"Q2 2023\"}"
  }'
```

## Security Considerations

- API keys are stored securely as environment variables
- Rate limiting prevents abuse
- Input validation protects against malicious requests
- CORS configuration restricts access to known origins
- Helmet middleware sets security-related HTTP headers

## License

[ISC](LICENSE) 