# Slack MCP Server

This server enables Model Context Protocol (MCP) integration with Slack, Google Drive, and Confluence.

## Prerequisites

- Node.js 18+
- pnpm
- Vercel CLI
- Slack App credentials
- Google Cloud credentials
- Confluence API token

## Environment Variables

Create a `.env` file with:

```env
# Slack
SLACK_BOT_TOKEN=your-slack-bot-token
SLACK_APP_TOKEN=your-slack-app-token
SLACK_SIGNING_SECRET=your-slack-signing-secret

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Google
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=https://your-slack-app.vercel.app/api/oauth/callback/google

# Confluence
CONFLUENCE_BASE_URL=your-confluence-base-url
CONFLUENCE_API_TOKEN=your-confluence-api-token

# Server URLs (Update after deployment)
GOOGLE_DRIVE_SERVER_URL=https://your-gdrive-server.vercel.app
CONFLUENCE_SERVER_URL=https://your-confluence-server.vercel.app
```

## Deployment Steps

1. **Deploy Google Drive Server**
   ```bash
   cd src/gdrive
   vercel
   ```

2. **Deploy Confluence Server**
   ```bash
   cd ../confluence
   vercel
   ```

3. **Deploy Slack Server**
   ```bash
   cd ../..
   vercel
   ```

4. **Update Environment Variables**
   - After each deployment, update the server URLs in the Slack server's `.env`
   - Redeploy the Slack server if you update the environment variables

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm run build

# Watch mode
pnpm run watch
```

## Troubleshooting

- If build fails, ensure you're deploying from the root directory
- Verify all environment variables are set correctly
- Check that server URLs are updated after deployment
- Ensure proper workspace configuration with pnpm

## Tools

1. `slack_list_channels`
   - List public channels in the workspace
   - Optional inputs:
     - `limit` (number, default: 100, max: 200): Maximum number of channels to return
     - `cursor` (string): Pagination cursor for next page
   - Returns: List of channels with their IDs and information

2. `slack_post_message`
   - Post a new message to a Slack channel
   - Required inputs:
     - `channel_id` (string): The ID of the channel to post to
     - `text` (string): The message text to post
   - Returns: Message posting confirmation and timestamp

3. `slack_reply_to_thread`
   - Reply to a specific message thread
   - Required inputs:
     - `channel_id` (string): The channel containing the thread
     - `thread_ts` (string): Timestamp of the parent message
     - `text` (string): The reply text
   - Returns: Reply confirmation and timestamp

4. `slack_add_reaction`
   - Add an emoji reaction to a message
   - Required inputs:
     - `channel_id` (string): The channel containing the message
     - `timestamp` (string): Message timestamp to react to
     - `reaction` (string): Emoji name without colons
   - Returns: Reaction confirmation

5. `slack_get_channel_history`
   - Get recent messages from a channel
   - Required inputs:
     - `channel_id` (string): The channel ID
   - Optional inputs:
     - `limit` (number, default: 10): Number of messages to retrieve
   - Returns: List of messages with their content and metadata

6. `slack_get_thread_replies`
   - Get all replies in a message thread
   - Required inputs:
     - `channel_id` (string): The channel containing the thread
     - `thread_ts` (string): Timestamp of the parent message
   - Returns: List of replies with their content and metadata


7. `slack_get_users`
   - Get list of workspace users with basic profile information
   - Optional inputs:
     - `cursor` (string): Pagination cursor for next page
     - `limit` (number, default: 100, max: 200): Maximum users to return
   - Returns: List of users with their basic profiles

8. `slack_get_user_profile`
   - Get detailed profile information for a specific user
   - Required inputs:
     - `user_id` (string): The user's ID
   - Returns: Detailed user profile information

## Setup

1. Create a Slack App:
   - Visit the [Slack Apps page](https://api.slack.com/apps)
   - Click "Create New App"
   - Choose "From scratch"
   - Name your app and select your workspace

2. Configure Bot Token Scopes:
   Navigate to "OAuth & Permissions" and add these scopes:
   - `channels:history` - View messages and other content in public channels
   - `channels:read` - View basic channel information
   - `chat:write` - Send messages as the app
   - `reactions:write` - Add emoji reactions to messages
   - `users:read` - View users and their basic information

4. Install App to Workspace:
   - Click "Install to Workspace" and authorize the app
   - Save the "Bot User OAuth Token" that starts with `xoxb-`

5. Get your Team ID (starts with a `T`) by following [this guidance](https://slack.com/help/articles/221769328-Locate-your-Slack-URL-or-ID#find-your-workspace-or-org-id)

### Usage with Claude Desktop

Add the following to your `claude_desktop_config.json`:

#### npx

```json
{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-slack"
      ],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-bot-token",
        "SLACK_TEAM_ID": "T01234567"
      }
    }
  }
}
```