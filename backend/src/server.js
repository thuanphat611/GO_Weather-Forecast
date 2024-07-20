const http = require('http');
const app = require('./app');

// Get port from environment or default to 3000
const port = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// Start server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});