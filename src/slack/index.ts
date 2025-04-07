#!/usr/bin/env node
import pkg from '@slack/bolt';
const { App } = pkg;
import OpenAI from 'openai';

// Initialize Slack app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Test command
app.command('/test', async ({ ack, say }) => {
  await ack();
  console.log('Received /test command');
  await say('MCP Server is connected and working! 🎉');
});

// Handle mentions of the bot
app.event('app_mention', async ({ event, say }) => {
  console.log('Received mention:', event.text);
  try {
    // Get the message text without the bot mention
    const message = event.text.replace(/<@[^>]+>/, '').trim();
    console.log('Processing message:', message);
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant in a Slack workspace." },
        { role: "user", content: message }
      ],
    });

    console.log('OpenAI response:', completion.choices[0]?.message?.content);

    // Send the response back to Slack
    await say({
      text: completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.",
      thread_ts: event.thread_ts || event.ts
    });
  } catch (error) {
    console.error('Error:', error);
    await say({
      text: "Sorry, I encountered an error while processing your request.",
      thread_ts: event.thread_ts || event.ts
    });
  }
});

// Start the app
(async () => {
  await app.start();
  console.log('⚡️ Slack bot is running!');
})(); 