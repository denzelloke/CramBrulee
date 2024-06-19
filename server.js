const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./public/scripts/serverScript"); // Adjust path as needed

const templatePath = path.join(__dirname, "./public/templates");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });
    if (check && check.password === req.body.password) {
      res.render("monthView"); // redirect to home page
    } else {
      res.send("username exists, incorrect password");
    }
  } catch {
    res.send("incorrect credentials");
  }
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      password: req.body.password,
    };

    await collection.insertMany([data]);
    res.render("login"); // redirect to login page
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("unknown error");
  }
});

app.get("/dayView", (req, res) => {
  res.render("dayView");
});

app.get("/weekView", (req, res) => {
  res.render("weekView");
});

app.get("/monthView", (req, res) => {
  res.render("monthView");
});

app.listen(3000, () => {
  console.log("port connected");
});


// Export the app to be used as a serverless function
module.exports = app;