import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import { LogInCollection, EventsCollection } from './public/scripts/serverScript.js'; // Adjust path as needed
import getEventSuggestions from './public/scripts/apiService.mjs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const templatePath = path.join(__dirname, './public/templates');
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
    const check = await LogInCollection.findOne({ name: req.body.name });
    if (check && check.password === req.body.password) {
      res.render("calendar", { userId: check._id }); // pass userId to calendar page
    } else {
      res.send("incorrect credentials, please try again");
    }
  } catch {
    res.send("incorrect credentials, please try again");
  }
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  try {
    const existingUser = await LogInCollection.findOne({ name: req.body.name });
    if (existingUser) {
      res.send("This username is taken, please refresh and try a different username");
    } else {
      const data = {
        name: req.body.name,
        password: req.body.password,
      };

      await LogInCollection.insertMany([data]);
      res.render("login"); // redirect to login page
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("unknown error");
  }
});

app.get("/calendar", (req, res) => {
  res.render("calendar");
});

// Add event routes
app.get("/events/:userId", async (req, res) => {
  try {
    const events = await EventsCollection.find({ userId: req.params.userId });
    res.json(events);
  } catch (error) {
    res.status(500).send("Error fetching events");
  }
});

app.post("/events", async (req, res) => {
  try {
    const newEvent = new EventsCollection(req.body);
    await newEvent.save();
    res.json(newEvent);
  } catch (error) {
    res.status(500).send("Error saving event");
  }
});

app.delete("/events/:id", async (req, res) => {
  try {
    await EventsCollection.findByIdAndDelete(req.params.id);
    res.send("Event deleted");
  } catch (error) {
    res.status(500).send("Error deleting event");
  }
});

// Route to fetch user events
app.post('/getUserEvents', async (req, res) => {
  const { userId } = req.body;
  try {
    const events = await EventsCollection.find({ userId });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).send('Server error');
  }
});

app.post('/getEventSuggestion', async (req, res) => {
  const { events, eventTitle } = req.body;
  try {
    const suggestion = await getEventSuggestions(events, eventTitle);
    res.json(suggestion);
  } catch (error) {
    console.error('Error getting event suggestion:', error);
    res.status(500).send('Server error');
  }
});

app.listen(3000, () => {
  console.log("port connected");
});

// Export the app to be used as a serverless function
export default app;
