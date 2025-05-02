#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// Import Omnisend API tools
import * as contactsTools from './tools/contacts.js';
import * as productsTools from './tools/products.js';
import * as eventsTools from './tools/events.js';

// Create MCP server
const server = new McpServer(
  {
    name: "Omnisend API",
    version: "1.0.0",
  }
);

// Register contacts tools
server.tool(
  "listContacts",
  {
    limit: z.number().optional().describe("Maximum number of contacts to return"),
    offset: z.number().optional().describe("Skip first N results")
  },
  async ({ limit, offset }) => {
    try {
      console.log('listContacts', limit, offset)
      const result = await contactsTools.listContacts({ limit, offset });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      console.error(`Error executing listContacts: ${error.message}`);
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "createContact",
  {
    contactData: z.object({}).passthrough().describe("Contact data")
  },
  async ({ contactData }) => {
    try {
      const result = await contactsTools.createOrUpdateContact(contactData);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      console.error(`Error executing createContact: ${error.message}`);
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "getContact",
  {
    contactId: z.string().describe("Contact ID")
  },
  async ({ contactId }) => {
    try {
      const result = await contactsTools.getContact(contactId);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      console.error(`Error executing getContact: ${error.message}`);
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "updateContact",
  {
    contactId: z.string().describe("Contact ID"),
    contactData: z.object({}).passthrough().describe("Contact data")
  },
  async ({ contactId, contactData }) => {
    try {
      const result = await contactsTools.updateContact(contactId, contactData);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      console.error(`Error executing updateContact: ${error.message}`);
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
    }
  }
);

// Register products tools
server.tool(
  "listProducts",
  {
    limit: z.number().optional().describe("Maximum number of products to return"),
    offset: z.number().optional().describe("Skip first N results")
  },
  async ({ limit, offset }) => {
    try {
      const result = await productsTools.listProducts({ limit, offset });
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      console.error(`Error executing listProducts: ${error.message}`);
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "createProduct",
  {
    productData: z.object({}).passthrough().describe("Product data")
  },
  async ({ productData }) => {
    try {
      const result = await productsTools.createProduct(productData);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      console.error(`Error executing createProduct: ${error.message}`);
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "getProduct",
  {
    productId: z.string().describe("Product ID")
  },
  async ({ productId }) => {
    try {
      const result = await productsTools.getProduct(productId);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      console.error(`Error executing getProduct: ${error.message}`);
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "replaceProduct",
  {
    productId: z.string().describe("Product ID"),
    productData: z.object({}).passthrough().describe("Product data")
  },
  async ({ productId, productData }) => {
    try {
      const result = await productsTools.replaceProduct(productId, productData);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      console.error(`Error executing replaceProduct: ${error.message}`);
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "deleteProduct",
  {
    productId: z.string().describe("Product ID")
  },
  async ({ productId }) => {
    try {
      const result = await productsTools.deleteProduct(productId);
      return {
        content: [{ type: "text", text: result ? "Product successfully deleted" : "Product was not deleted" }]
      };
    } catch (error) {
      console.error(`Error executing deleteProduct: ${error.message}`);
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
    }
  }
);

// Register events tool
server.tool(
  "sendEvent",
  {
    eventData: z.object({
      eventName: z.string().describe("Event name"),
      contact: z.object({}).passthrough().describe("Contact information"),
      properties: z.object({}).passthrough().optional().describe("Additional event properties"),
      eventTime: z.string().optional().describe("Event time in RFC3339 format"),
      eventVersion: z.string().optional().describe("Event version")
    }).describe("Event data")
  },
  async ({ eventData }) => {
    try {
      const result = await eventsTools.sendEvent(eventData);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
      };
    } catch (error) {
      console.error(`Error executing sendEvent: ${error.message}`);
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }],
        isError: true
      };
    }
  }
);
  // Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);