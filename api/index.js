const app = require("../index.js"); // Import the Express app

module.exports = (req, res) => {
  app(req, res); // Handle requests with the Express app
};
app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });
    if (check && check.password === req.body.password) {
      res.render("calendar"); // redirect to home page
    } else {
      res.send("username exists, incorrect password");
    }
  } catch {
    res.send("incorrect credentials");
  }
});
