const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./public/scripts/serverScript"); //tells code where to find "serverScript"

const templatePath = path.join(__dirname, "./public/templates"); //tells code where to find "templates"
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  //fetch user input for name and pw. if match in database then allow to render homepage

  try {
    const check = await collection.findOne({ name: req.body.name });
    if (check.password === req.body.password) {
      res.render("monthView"); //redirect to home page
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
// signup form that stores name and pw into database
app.post("/signup", async (req, res) => {
  try {
    const data = {
      name: req.body.name, //fetches user input
      password: req.body.password,
    };

    await collection.insertMany([data]); //creates a data???
    res.render("login"); //redirect to login page
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
