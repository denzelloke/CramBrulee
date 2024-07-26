// apiService.mjs
import OpenAI from "openai";
import dotenv from "dotenv";
import readline from "readline";

const openai = new OpenAI({
  //INSERT API KEY HERE
});

const conversation = [];
async function getEventSuggestions(events) {
  const prompt = `Based on the following events: ${JSON.stringify(events)}, 
  suggest a new event for the user. provide your answer in the following format.
  Suggested Event Title: 
  Suggested Event Date: 
  Suggested Event Time: `;

  try {
    conversation.push({ role: "user", content: prompt });

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: conversation,
    });

    const assistantMessage = response.choices[0].message.content.trim();
    console.log("Assistant:", assistantMessage);
    return assistantMessage;
  } catch (error) {
    console.error("Error fetching event suggestions:", error);
    return "Error 3 getting suggestion";
  }
}

export default getEventSuggestions;
