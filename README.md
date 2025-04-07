# Model Context Protocol Servers

This repository contains multiple MCP servers that can be deployed independently or together. Each server provides specific functionality and can communicate with other servers.

## Available Servers

- **Slack Server**: Enables MCP integration with Slack
- **Google Drive Server**: Provides access to Google Drive
- **Confluence Server**: Enables Confluence integration
- **Other Servers**: Additional MCP servers for various integrations

## Deployment Strategy

### Independent Deployment
Each server can be deployed independently if you only need specific functionality:
```bash
# Deploy a single server
cd src/[server-name]
vercel
```

### Integrated Deployment
For full integration (e.g., Slack with Google Drive and Confluence):

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

4. **Configure Integration**
   - Update the Slack server's `.env` with the deployed server URLs
   - Redeploy the Slack server if you update the environment variables

## Server Documentation

Each server has its own documentation in its directory:
- `src/slack/README.md` - Slack server documentation
- `src/gdrive/README.md` - Google Drive server documentation
- `src/confluence/README.md` - Confluence server documentation

## Workspace Configuration

This is a monorepo using pnpm workspaces. The root configuration files are essential for all servers:
- `tsconfig.json` - TypeScript configuration
- `pnpm-workspace.yaml` - Workspace management
- `vercel.json` - Deployment configuration

## Development

```bash
# Install all dependencies
pnpm install

# Build all servers
pnpm run build

# Build specific server
cd src/[server-name]
pnpm run build
```

---

Managed by Anthropic, but built together with the community. The Model Context Protocol is open source and we encourage everyone to contribute their own servers and improvements!
