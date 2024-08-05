# Crambrulee

## General Details

### Documentation: https://docs.google.com/document/d/1NJYrrDUmPWrZGAuYLO0DFdPRINOexmdeYmMg_YjxGRM/edit?usp=drive_link (this document)

### Description:
This app is intended to be a calendar app that intuitively helps you plan your tasks based on your calendar availability and task urgency. 

### Proposed Level of Achievement: Project Gemini

### Project Scope: To create a Web App that displays users' personalised calendars, and intuitively suggests timeslots for users to begin working on new tasks, based on factors like task urgency and calendar availability.

## Tech Stack 
We used Javascript for our frontend, Express and Node.js for our backend, and MongoDB for the database to store information required for user authentication.

## Local Deployment

### Prerequisites
Before you begin, ensure that your machine has the following software and dependencies downloaded. If the terminal is unresponsive, use Ctrl + C and try again.
- Node.js: Install Node.js from nodejs.org.
- npm: npm is installed with Node.js.
- MongoDB: Install MongoDB from mongodb.com. Ensure MongoDB is running on localhost:27017.
- express: Type into terminal "npm i express"
- mongoose: Type into terminal "npm i mongoose"
- hbs: Type into terminal "npm i hbs"
- openai: Type into terminal “npm i openai@^4.0.0”

### Installation
To set up the project locally, clone the CramBrulee repository into your machine using the gitHub desktop app. Alternatively, you can enter the following terminal command to clone the repository using Git "git clone https://github.com/timothyloh0523/crambrulee.git"
.env file
Before running CramBrulee, a file called “.env” containing the OpenAI API key needs to be created first. Do so in the root directory (the path should look something like this, e.g. C:\Users\joe12345\...\crambrulee\.env). For privacy reasons, do message @dndnzel or @timo_lyx on Telegram for the necessary file.

### Usage
Open Command Prompt or Terminal and navigate to the directory crambrulee/src
Run the application using the following terminal command: nodemon index.mjs (if successful, terminal should display "port connected" and "mongoDB connected")
Open a web browser and go to http://localhost:3000. You should see the login page.
You will be able to create a new user using the signup form, once a new user has been created you will be directed to the login page. Users will only be permitted to log into the home page after logging in with the correct credentials. Different messages have been implemented to feedback different types of incorrect login credentials.
At the home page, select different views to navigate between them, and click to add an event.

## Milestone Progress:
- Milestone 1: Created Home Page, Login form, and Signup form.
- Milestone 2: Created 3 different calendar views (Month, Day, Week), and ability to add events by day
- Milestone 3: 
1. Added “Suggest Event” button with OpenAI functionality to both suggest date and times for currently unscheduled events, and suggest new events for user consideration. 
2. Added ability to add events at specific times of the day
3. Added “Task List” as a view option
4. Added quality-of-life changes, such as ability to colour-code events

