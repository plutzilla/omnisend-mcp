#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// Import modules
import { registerAllResources } from './resources/index.js';
import { 
  registerPingTool, 
  registerContactsTools, 
  registerProductsTools, 
  registerCategoriesTools, 
  registerEventsTools,
  registerBrandsTools
} from './tools/index.js';

// Define the server version (hardcoded for simplicity)
export const SERVER_VERSION = "2.3.0";

// Create MCP server
const server = new McpServer(
  {
    name: "Omnisend API",
    version: SERVER_VERSION,
  }
);

// Register resources and tools
registerAllResources(server);
registerPingTool(server);
registerContactsTools(server);
registerProductsTools(server);
registerCategoriesTools(server);
registerEventsTools(server);
registerBrandsTools(server);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();

try {
  await server.connect(transport);
} catch (error) {
  process.stderr.write(`Error connecting MCP server to transport: ${(error as Error).message}\n`);
  process.exit(1);
} 