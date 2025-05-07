# Omnisend MCP Server

A Model Context Protocol (MCP) server that integrates with Omnisend API V5, written in TypeScript.

**Version:** 2.1.0

<a href="https://glama.ai/mcp/servers/@plutzilla/omnisend-mcp">
<img width="380" src="https://glama.ai/mcp/servers/@plutzilla/omnisend-mcp/badge" alt="Omnisend Server MCP server" />
</a>

## Features

- Contact management (list, create, get, update)
- Product management (list, create, get, replace, delete)
- Event tracking
- Product categories management

## Changes in Version 2.1.0

- Updated to @modelcontextprotocol/sdk v1.11.0
- Improved error handling throughout the application
- Enhanced API stability with better error messages
- Added request timeout configuration to prevent hanging connections
- Fixed SSE connection issues with MCP Inspector
- Optimized console output to be compatible with MCP clients

## Changes in Version 2.0.0

- Migrated entire codebase to TypeScript
- Updated MCP resource structure according to latest specification
- Added proper type declarations for all API responses and requests
- Improved error handling with typed exceptions
- Enhanced code organization and maintainability

## Installation

```bash
npm install
```

## Building

To compile TypeScript code:

```bash
npm run build
```

## Running in Development Mode

For development with auto-reloading:

```bash
npm run dev
```

## Configuration

Create a `.env` file in the root directory with your Omnisend API key:

```javascript
OMNISEND_API_KEY=your_api_key_here
OMNISEND_API_URL=https://api.omnisend.com/v5
```

## Usage

To start the MCP server:

```bash
npm start
```

## Interacting with the MCP Server

The MCP server is designed to be used with clients that understand the Model Context Protocol.
Here are ways to interact with it:

### VS Code Integration

For use with VS Code, a configuration file is provided in `.vscode/mcp.json`.
VS Code with the appropriate MCP extension can communicate with this server.

### AI Assistants

AI assistants like Claude that support MCP can communicate with this server to access Omnisend data and perform operations.

### Using with Claude Desktop

To use this MCP server with Claude Desktop:

1. Download and install Claude Desktop from the [official website](https://claude.ai/desktop).

2. Make sure you have Node.js installed on your system. You can verify by running:

   ```bash
   node --version
   ```

   If Node.js is not installed, download it from [nodejs.org](https://nodejs.org/).

3. Open the Claude menu on your computer and select "Settings..."

4. Click on "Developer" in the left-hand bar of the Settings pane, and then click on "Edit Config"

5. This will open your Claude Desktop configuration file. Replace the file contents with or add the following configuration:

   ```json
   {
     "mcpServers": {
       "omnisend": {
         "command": "node",
         "args": [
           "/path/to/dist/index.js"
         ],
         "env": {
           "OMNISEND_API_KEY": "your_api_key_here"
         }
       }
     }
   }
   ```

   Make sure to replace `your_api_key_here` with your actual Omnisend API key.

6. Save the configuration file and restart Claude Desktop.

7. After restarting, you should see a hammer icon in the bottom right corner of the input box.

8. Click on the hammer icon to see the available Omnisend tools.

9. You can now ask Claude to perform operations such as:
   - "List my recent contacts in Omnisend"
   - "Create a new product in my Omnisend catalog"
   - "Send a customer event to Omnisend"

### Custom MCP Clients

You can develop custom clients using the `@modelcontextprotocol/sdk` library:

```javascript
import { McpClient } from '@modelcontextprotocol/sdk/client/mcp';
import { ProcessClientTransport } from '@modelcontextprotocol/sdk/client/process';

const transport = new ProcessClientTransport(serverProcess);
const client = new McpClient(transport);

// Connect to the server
await client.connect();

// Execute tools
const result = await client.executeTool("listContacts", { limit: 10 });
```

## API Documentation

For more information about the Omnisend API, see the [official documentation](https://api-docs.omnisend.com/).

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
