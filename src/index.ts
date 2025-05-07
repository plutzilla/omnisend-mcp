#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

// Import modules
import { registerResources } from './modules/shared/resources.js';
import { registerPingTool } from './modules/shared/server.js';
import { registerContactsTools } from './modules/contacts/tools.js';
import { registerProductsTools } from './modules/products/tools.js';
import { registerCategoriesTools } from './modules/categories/tools.js';
import { registerEventsTools } from './modules/events/tools.js';

// Create MCP server
const server = new McpServer(
  {
    name: "Omnisend API",
    version: "2.1.0",
  }
);

// Register resources and tools
registerResources(server);
registerPingTool(server);
registerContactsTools(server);
registerProductsTools(server);
registerCategoriesTools(server);
registerEventsTools(server);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();

try {
  await server.connect(transport);
} catch (error) {
  process.stderr.write(`Error connecting MCP server to transport: ${(error as Error).message}\n`);
  process.exit(1);
} 