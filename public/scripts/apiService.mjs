// apiService.mjs
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const conversation = [];
async function getEventSuggestions(events, eventTitle) {
  let prompt;

  try {
    if (eventTitle) {
      console.log("event title detected", eventTitle);
      prompt = `Based on the following events: ${JSON.stringify(events)}, 
    suggest a date and time for an task titled "${eventTitle}". 
    do take note of any due dates relating to this task. schedule the task at an appropriate time so as to meet the duedate or deadline.
    Provide your answer in the following format. DO NOT DEVIATE FROM THE FORMAT OR PROVIDE ANY ADDITIONAL INFORMATION.
    Suggested Event Title: 
    Suggested Event Start Date: 
    Suggested Event Start Time: 
    Suggested Event End Date: 
    Suggested Event End Time: `;

      conversation.push({ role: "user", content: prompt });

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: conversation,
      });

      const assistantMessage = response.choices[0].message.content.trim();
      console.log("Assistant:", assistantMessage);

      // Parse the assistant's message to extract title, date, and time
      const [titleLine, startDateLine, startTimeLine, endDateLine, endTimeLine] = assistantMessage.split("\n");
      const title = eventTitle;
      const startDate = startDateLine.replace("Suggested Event Start Date: ", "").trim();
      const startTime = startTimeLine.replace("Suggested Event Start Time: ", "").trim();
      const endDate = endDateLine.replace("Suggested Event End Date: ", "").trim();
      const endTime = endTimeLine.replace("Suggested Event End Time: ", "").trim();
      return { title, startDate, startTime , endDate , endTime };

    } else {
      console.log(" NO event title detected", eventTitle);
      prompt = `Based on the following events: ${JSON.stringify(events)}, 
    suggest a new event for the user. 
    Provide your answer in the following format.DO NOT DEVIATE FROM THE FORMAT OR PROVIDE ANY ADDITIONAL INFORMATION.
    Suggested Event Title: 
    Suggested Event Start Date: 
    Suggested Event Start Time: 
    Suggested Event End Date: 
    Suggested Event End Time: `;

      conversation.push({ role: "user", content: prompt });

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: conversation,
      });

      const assistantMessage = response.choices[0].message.content.trim();
      console.log("Assistant:", assistantMessage);

      // Parse the assistant's message to extract title, date, and time
      const [titleLine, startDateLine, startTimeLine, endDateLine, endTimeLine] = assistantMessage.split("\n");
      const title = titleLine.replace("Suggested Event Title: ", "").trim();
      const startDate = startDateLine.replace("Suggested Event Start Date: ", "").trim();
      const startTime = startTimeLine.replace("Suggested Event Start Time: ", "").trim();
      const endDate = endDateLine.replace("Suggested Event End Date: ", "").trim();
      const endTime = endTimeLine.replace("Suggested Event End Time: ", "").trim();
      return { title, startDate, startTime , endDate , endTime };


    }
  } catch (error) {
    console.error("Error fetching event suggestions:", error);
    return "Error 3 getting suggestion";
  }
}

export default getEventSuggestions;
