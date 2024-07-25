// apiService.mjs
import OpenAI from 'openai';
import dotenv from 'dotenv';
import readline from 'readline';

// ADD KEY HERE


const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

/*
async function getEventSuggestions(events) {
  const prompt = `Based on the following events: ${JSON.stringify(events)}, suggest a new event for the user.`;

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 50
    })
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}

export default getEventSuggestions;
*/
async function getEventSuggestions(events) {
  const prompt = `Based on the following events: ${JSON.stringify(events)}, suggest a new event for the user.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Specify the model here
        prompt: prompt,
        max_tokens: 50
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      return 'Error getting suggestion';
    }

    const data = await response.json();

    console.log('API Response:', data); // Log the response for debugging

    if (data.choices && Array.isArray(data.choices) && data.choices.length > 0) {
      return data.choices[0].text.trim();
    } else {
      console.error('Unexpected response structure:', data);
      return 'Error getting suggestion';
    }
  } catch (error) {
    console.error('Error fetching event suggestions:', error);
    return 'Error getting suggestion';
  }
}

export default getEventSuggestions;