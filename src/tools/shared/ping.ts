import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SERVER_VERSION } from '../../index.js';

export const registerPingTool = (server: McpServer) => {
  // Add a simple ping tool to check if the server is working
  server.tool(
    "ping",
    "Simple tool to check if the MCP server is running correctly.",
    {},
    async () => {
      return {
        content: [{ type: "text", text: `Omnisend MCP server is working correctly. Server version: ${SERVER_VERSION}` }]
      };
    }
  );
}; 