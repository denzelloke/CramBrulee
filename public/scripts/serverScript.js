const mongoose = require('mongoose');
require('dotenv').config(); // Ensure you have dotenv configured if running locally

// Use the environment variable for the MongoDB connection string
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/CramBrulee";

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connected");
})
.catch((e) => {
    console.log("Failed to connect to MongoDB", e);
});

const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const LogInCollection = mongoose.model("LogInCollection", LogInSchema);

module.exports = LogInCollection;
