# crambrulee
 
## Documentation
 
https://docs.google.com/document/d/1NJYrrDUmPWrZGAuYLO0DFdPRINOexmdeYmMg_YjxGRM/edit?usp=drive_link


## Description


This app is intended to be a calendar app that intuitively helps you plan your tasks based on your calendar availability and task urgency.
In milestone 1, we successfully created a Home Page, a Login form, and a Signup form.

Currently, we have also created 3 different calendar views (Month, Day, Week) as well as the ability to add an event by day (see video).
However, we are currently experiencing extensive issues regarding Vercel deployment, where only the login and signup pages are able to be displayed. We are working on a fix.
We use MongoDB as a database to store information required for user authentication.
 
Level of Achievement: Project Gemini

Project Scope: To create a Web App that displays Users' personalised calendars, and intuitively suggests timeslots for User to begin working on new tasks, based on factors like task urgency and calendar availability.


## Web Deployment (currently having database-related timeout issues)

https://crambrulee.vercel.app/


## Local Deployment


### Prerequisites


Before you begin, ensure that your machine has the following software and dependencies downloaded


- **Node.js**: Install Node.js from [nodejs.org](https://nodejs.org/).
- **npm**: npm is installed with Node.js.
- **MongoDB**: Install MongoDB from [mongodb.com](https://www.mongodb.com/). Ensure MongoDB is running on `localhost:27017`.
- **express**: Type into terminal "npm i express"
- **mongoose**: Type into terminal "npm i mongoose"
- **hbs**: Type into terminal "npm i hbs"


### Installation


To set up the project locally, clone the cramBrulee repository into your machine using the gitHub desktop app.
Alternatively, you can enter the following terminal command to clone the repository using Git
"git clone https://github.com/timothyloh0523/crambrulee.git"


## Usage


1. Open Command Prompt or Terminal and navigate to the directiory crambrulee/src
2. Run the application using the following terminal command: node index.js (if successful, terminal should diplay "port connected" and "mongoDB connected")
3. Open a web browser and go to http://localhost:3000. You should see the login page.
4. You will be able to create a new user using the signup form, once a new user has been created you will be directed to the login page. Users will only be permitted to log into the home page after logging in with the correct credentials. Different messages have been implemented to feedback different types of incorrect log in credentials.
5. At the home page, select different views to navigate between them, and click to add event.


## To Do


1. Allow events to be added by hour and not just by day (as of now)
2. Fix Vercel deployment issues
3. Continue with the adding of new features
