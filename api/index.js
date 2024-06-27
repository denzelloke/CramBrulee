const app = require("../server.js"); // Import the Express app

module.exports = (req, res) => {
  app(req, res); // Handle requests with the Express app
};