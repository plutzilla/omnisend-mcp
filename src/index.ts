#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// Import Omnisend API tools
import * as contactsTools from './tools/contacts.js';
import * as productsTools from './tools/products.js';
import * as eventsTools from './tools/events.js';
import * as categoriesTools from './tools/categories.js';
import { Resource } from './types/index.js';

// Helper functions to filter data based on resource definitions
const filterContactFields = (contact: any) => {
  return {
    contactID: contact.contactID,
    email: contact.email,
    phone: contact.phone,
    firstName: contact.firstName,
    lastName: contact.lastName,
    status: contact.status,
    tags: contact.tags,
    identifiers: contact.identifiers,
    createdAt: contact.createdAt,
    updatedAt: contact.updatedAt,
    // Include added fields
    country: contact.country,
    state: contact.state,
    city: contact.city,
    gender: contact.gender,
    birthdate: contact.birthdate
  };
};

const filterProductFields = (product: any) => {
  return {
    productID: product.productID,
    title: product.title,
    status: product.status,
    description: product.description,
    currency: product.currency,
    price: product.price,
    oldPrice: product.oldPrice,
    productUrl: product.productUrl,
    imageUrl: product.imageUrl,
    vendor: product.vendor,
    variants: product.variants,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt
  };
};

const filterCategoryFields = (category: any) => {
  return {
    categoryID: category.categoryID,
    title: category.title,
    handle: category.handle,
    description: category.description,
    imageUrl: category.imageUrl,
    categoryUrl: category.categoryUrl,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt
  };
};

const filterEventFields = (event: any) => {
  return {
    eventID: event.eventID,
    eventName: event.eventName,
    email: event.email,
    phone: event.phone,
    contactID: event.contactID,
    contact: event.contact ? filterContactFields(event.contact) : undefined,
    properties: event.properties,
    createdAt: event.createdAt
  };
};

// Create MCP server
const server = new McpServer(
  {
    name: "Omnisend API",
    version: "2.1.0",
  }
);

// Define MCP resources
server.resource(
  'Contact',
  'contact://schema',
  {
    type: 'Contact',
    description: 'Represents a contact in Omnisend. Each contact can be identified by multiple identifiers (email, phone) with corresponding channels.',
    fields: {
      contactID: { type: 'string', description: 'Unique identifier of the contact' },
      email: { type: 'string', description: 'Email address of the contact' },
      phone: { type: 'string', description: 'Phone number of the contact' },
      firstName: { type: 'string', description: 'First name of the contact' },
      lastName: { type: 'string', description: 'Last name of the contact' },
      status: { type: 'string', description: 'Subscription status: subscribed, unsubscribed, nonSubscribed' },
      tags: { type: 'array', description: 'Tags associated with the contact' },
      identifiers: { type: 'array', description: 'Identifiers for the contact (email, phone)' },
      createdAt: { type: 'string', description: 'Date when the contact was created' },
      updatedAt: { type: 'string', description: 'Date when the contact was last updated' },
      country: { type: 'string', description: 'Country of the contact' },
      state: { type: 'string', description: 'State/region of the contact' },
      city: { type: 'string', description: 'City of the contact' },
      gender: { type: 'string', description: 'Gender of the contact' },
      birthdate: { type: 'string', description: 'Birth date of the contact in ISO format' }
    }
  },
  async (uri) => {
    return {
      contents: [{
        uri: uri.href,
        text: "Contact schema definition"
      }]
    };
  }
);

server.resource(
  'Product',
  'product://schema',
  {
    type: 'Product',
    description: 'Represents a product in the Omnisend catalog.',
    fields: {
      productID: { type: 'string', description: 'Unique identifier of the product' },
      title: { type: 'string', description: 'Product title' },
      status: { type: 'string', description: 'Product status: draft, active, archived' },
      description: { type: 'string', description: 'Product description' },
      currency: { type: 'string', description: 'Currency code for product price' },
      price: { type: 'number', description: 'Product price' },
      oldPrice: { type: 'number', description: 'Old product price (before discount)' },
      productUrl: { type: 'string', description: 'URL to the product page' },
      imageUrl: { type: 'string', description: 'URL to the product image' },
      vendor: { type: 'string', description: 'Product vendor/brand' },
      variants: { type: 'array', description: 'Product variants with different sizes, colors, etc.' },
      createdAt: { type: 'string', description: 'Date when the product was created' },
      updatedAt: { type: 'string', description: 'Date when the product was last updated' }
    }
  },
  async (uri) => {
    return {
      contents: [{
        uri: uri.href,
        text: "Product schema definition"
      }]
    };
  }
);

server.resource(
  'Event',
  'event://schema',
  {
    type: 'Event',
    description: 'Represents a customer event in Omnisend.',
    fields: {
      eventID: { type: 'string', description: 'Unique identifier of the event' },
      eventName: { type: 'string', description: 'Name of the event (e.g., "placed order", "viewed product")' },
      email: { type: 'string', description: 'Email address of the contact who triggered the event' },
      phone: { type: 'string', description: 'Phone number of the contact who triggered the event' },
      contactID: { type: 'string', description: 'ID of the contact who triggered the event' },
      contact: { type: 'object', description: 'Contact information' },
      properties: { type: 'object', description: 'Additional event properties' },
      createdAt: { type: 'string', description: 'Date when the event occurred' }
    }
  },
  async (uri) => {
    return {
      contents: [{
        uri: uri.href,
        text: "Event schema definition"
      }]
    };
  }
);

server.resource(
  'ProductCategory',
  'category://schema',
  {
    type: 'ProductCategory',
    description: 'Represents a product category in Omnisend.',
    fields: {
      categoryID: { type: 'string', description: 'Unique identifier of the category' },
      title: { type: 'string', description: 'Category title' },
      handle: { type: 'string', description: 'Category handle/slug' },
      description: { type: 'string', description: 'Category description' },
      imageUrl: { type: 'string', description: 'URL to the category image' },
      categoryUrl: { type: 'string', description: 'URL to the category page' },
      createdAt: { type: 'string', description: 'Date when the category was created' },
      updatedAt: { type: 'string', description: 'Date when the category was last updated' }
    }
  },
  async (uri) => {
    return {
      contents: [{
        uri: uri.href,
        text: "Product category schema definition"
      }]
    };
  }
);

// Add a simple ping tool to check if the server is working
server.tool(
  "ping",
  "Simple tool to check if the MCP server is running correctly.",
  {},
  async () => {
    return {
      content: [{ type: "text", text: "Omnisend MCP server is working correctly. Server version: 2.1.0" }]
    };
  }
);

// Register contacts tools
server.tool(
  "listContacts",
  "Retrieve a list of contacts from Omnisend. Each contact can be identified by multiple identifiers (email, phone) with corresponding channels. The response includes pagination information (next/previous cursor, limit, offset).",
  {
    limit: z.number().optional().describe("Maximum number of contacts to return"),
    offset: z.number().optional().describe("Skip first N results"),
    status: z.enum(["subscribed", "unsubscribed", "nonSubscribed"]).optional().describe("Filter contacts by subscription status")
  },
  async ({ limit, offset, status }) => {
    try {
      const result = await contactsTools.listContacts({ limit, offset, status });
      
      // Create filtered response with only the defined fields
      const filteredResult = {
        contacts: result.contacts.map(filterContactFields),
        paging: result.paging
      };
      
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify(filteredResult, null, 2)
        }],
        resources: result.contacts?.map(contact => ({
          type: 'Contact',
          id: contact.contactID,
          data: filterContactFields(contact)
        } as Resource)) || [],
        context: result.paging ? {
          pagination: {
            next: result.paging.next,
            previous: result.paging.previous,
            limit: result.paging.limit,
            offset: result.paging.offset
          }
        } : undefined
      };
    } catch (error) {
      console.error(`Error executing listContacts: ${(error as Error).message}`);
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "createContact",
  "Create or update a contact in Omnisend. Contact data can include identifiers (email, phone), personal information, subscription status, and custom properties.",
  {
    contactData: z.object({}).passthrough().describe("Contact data")
  },
  async ({ contactData }) => {
    try {
      const result = await contactsTools.createOrUpdateContact(contactData);
      const filteredResult = filterContactFields(result);
      
      return {
        content: [{ type: "text", text: JSON.stringify(filteredResult, null, 2) }],
        resources: [{
          type: 'Contact',
          id: result.contactID,
          data: filterContactFields(result)
        } as Resource]
      };
    } catch (error) {
      console.error(`Error executing createContact: ${(error as Error).message}`);
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "getContact",
  "Retrieve detailed information about a specific contact by their unique identifier.",
  {
    contactId: z.string().describe("Contact ID")
  },
  async ({ contactId }) => {
    try {
      const result = await contactsTools.getContact(contactId);
      const filteredResult = filterContactFields(result);
      
      return {
        content: [{ type: "text", text: JSON.stringify(filteredResult, null, 2) }],
        resources: [{
          type: 'Contact',
          id: result.contactID,
          data: filterContactFields(result)
        } as Resource]
      };
    } catch (error) {
      console.error(`Error executing getContact: ${(error as Error).message}`);
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "updateContact",
  "Update an existing contact's information. IMPORTANT: You must first get the contact using getContact and preserve the returned structure when updating. The update request requires the same structure as returned by the GET method, with only your desired changes applied.",
  {
    contactId: z.string().describe("Contact ID"),
    contactData: z.object({}).passthrough().describe("Contact data in the same structure as returned by getContact")
  },
  async ({ contactId, contactData }) => {
    try {
      const result = await contactsTools.updateContact(contactId, contactData);
      const filteredResult = filterContactFields(result);
      
      return {
        content: [{ type: "text", text: JSON.stringify(filteredResult, null, 2) }],
        resources: [{
          type: 'Contact',
          id: result.contactID,
          data: filterContactFields(result)
        } as Resource]
      };
    } catch (error) {
      console.error(`Error executing updateContact: ${(error as Error).message}`);
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

// Register products tools
server.tool(
  "listProducts",
  "Retrieve a list of products from the Omnisend catalog with pagination support. The response includes pagination information (next/previous cursor, limit, offset).",
  {
    limit: z.number().optional().describe("Maximum number of products to return"),
    offset: z.number().optional().describe("Skip first N results")
  },
  async ({ limit, offset }) => {
    try {
      const result = await productsTools.listProducts({ limit, offset });
      
      // Create filtered response with only the defined fields
      const filteredResult = {
        products: result.products.map(filterProductFields),
        paging: result.paging
      };
      
      return {
        content: [{ type: "text", text: JSON.stringify(filteredResult, null, 2) }],
        resources: result.products?.map(product => ({
          type: 'Product',
          id: product.productID,
          data: filterProductFields(product)
        } as Resource)) || [],
        context: result.paging ? {
          pagination: {
            next: result.paging.next,
            previous: result.paging.previous,
            limit: result.paging.limit,
            offset: result.paging.offset
          }
        } : undefined
      };
    } catch (error) {
      console.error(`Error executing listProducts: ${(error as Error).message}`);
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "createProduct",
  "Create a new product in the Omnisend catalog. Product data can include details like title, description, variants, images, price, and more.",
  {
    productData: z.object({}).passthrough().describe("Product data")
  },
  async ({ productData }) => {
    try {
      const result = await productsTools.createProduct(productData);
      const filteredResult = filterProductFields(result);
      
      return {
        content: [{ type: "text", text: JSON.stringify(filteredResult, null, 2) }],
        resources: [{
          type: 'Product',
          id: result.productID,
          data: filterProductFields(result)
        } as Resource]
      };
    } catch (error) {
      console.error(`Error executing createProduct: ${(error as Error).message}`);
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "getProduct",
  "Retrieve detailed information about a specific product by its unique identifier.",
  {
    productId: z.string().describe("Product ID")
  },
  async ({ productId }) => {
    try {
      const result = await productsTools.getProduct(productId);
      const filteredResult = filterProductFields(result);
      
      return {
        content: [{ type: "text", text: JSON.stringify(filteredResult, null, 2) }],
        resources: [{
          type: 'Product',
          id: result.productID,
          data: filterProductFields(result)
        } as Resource]
      };
    } catch (error) {
      console.error(`Error executing getProduct: ${(error as Error).message}`);
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "replaceProduct",
  "Replace an existing product with new data. IMPORTANT: You must first get the product using getProduct and preserve the returned structure when replacing. The replace request requires the same structure as returned by the GET method, with only your desired changes applied.",
  {
    productId: z.string().describe("Product ID"),
    productData: z.object({}).passthrough().describe("Product data in the same structure as returned by getProduct")
  },
  async ({ productId, productData }) => {
    try {
      const result = await productsTools.replaceProduct(productId, productData);
      const filteredResult = filterProductFields(result);
      
      return {
        content: [{ type: "text", text: JSON.stringify(filteredResult, null, 2) }],
        resources: [{
          type: 'Product',
          id: result.productID,
          data: filterProductFields(result)
        } as Resource]
      };
    } catch (error) {
      console.error(`Error executing replaceProduct: ${(error as Error).message}`);
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "deleteProduct",
  "Remove a product from the Omnisend catalog by its unique identifier.",
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
      console.error(`Error executing deleteProduct: ${(error as Error).message}`);
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

// Register events tool
server.tool(
  "sendEvent",
  "Send a customer event to Omnisend. Events are used to track customer behavior and can trigger automations. Can be custom events or predefined system events.",
  {
    eventData: z.object({
      eventName: z.string().describe("Event name"),
      contact: z.object({
        contactID: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional()
      }).passthrough().describe("Contact information"),
      properties: z.object({}).passthrough().optional().describe("Additional event properties"),
      eventTime: z.string().optional().describe("Event time in RFC3339 format"),
      eventVersion: z.string().optional().describe("Event version")
    }).describe("Event data")
  },
  async ({ eventData }) => {
    try {
      const result = await eventsTools.sendEvent(eventData);
      const filteredResult = filterEventFields(result);
      
      return {
        content: [{ type: "text", text: JSON.stringify(filteredResult, null, 2) }],
        resources: [{
          type: 'Event',
          id: result.eventID,
          data: filterEventFields(result)
        } as Resource]
      };
    } catch (error) {
      console.error(`Error executing sendEvent: ${(error as Error).message}`);
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

// Register product categories tools
server.tool(
  "listCategories",
  "Retrieve a list of product categories from the Omnisend catalog with pagination support. The response includes pagination information (next/previous cursor, limit, offset).",
  {
    limit: z.number().optional().describe("Maximum number of categories to return"),
    offset: z.number().optional().describe("Skip first N results")
  },
  async ({ limit, offset }) => {
    try {
      const result = await categoriesTools.listCategories({ limit, offset });
      
      // Create filtered response with only the defined fields
      const filteredResult = {
        categories: result.categories.map(filterCategoryFields),
        paging: result.paging
      };
      
      return {
        content: [{ type: "text", text: JSON.stringify(filteredResult, null, 2) }],
        resources: result.categories?.map(category => ({
          type: 'ProductCategory',
          id: category.categoryID,
          data: filterCategoryFields(category)
        } as Resource)) || [],
        context: result.paging ? {
          pagination: {
            next: result.paging.next,
            previous: result.paging.previous,
            limit: result.paging.limit,
            offset: result.paging.offset
          }
        } : undefined
      };
    } catch (error) {
      console.error(`Error executing listCategories: ${(error as Error).message}`);
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "createCategory",
  "Create a new product category in the Omnisend catalog. Category data can include title, description, image, and URL.",
  {
    categoryData: z.object({}).passthrough().describe("Product category data")
  },
  async ({ categoryData }) => {
    try {
      const result = await categoriesTools.createCategory(categoryData);
      const filteredResult = filterCategoryFields(result);
      
      return {
        content: [{ type: "text", text: JSON.stringify(filteredResult, null, 2) }],
        resources: [{
          type: 'ProductCategory',
          id: result.categoryID,
          data: filterCategoryFields(result)
        } as Resource]
      };
    } catch (error) {
      console.error(`Error executing createCategory: ${(error as Error).message}`);
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "getCategory",
  "Retrieve detailed information about a specific product category by its unique identifier.",
  {
    categoryId: z.string().describe("Category ID")
  },
  async ({ categoryId }) => {
    try {
      const result = await categoriesTools.getCategory(categoryId);
      const filteredResult = filterCategoryFields(result);
      
      return {
        content: [{ type: "text", text: JSON.stringify(filteredResult, null, 2) }],
        resources: [{
          type: 'ProductCategory',
          id: result.categoryID,
          data: filterCategoryFields(result)
        } as Resource]
      };
    } catch (error) {
      console.error(`Error executing getCategory: ${(error as Error).message}`);
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "updateCategory",
  "Update an existing product category. IMPORTANT: You must first get the category using getCategory and preserve the returned structure when updating.",
  {
    categoryId: z.string().describe("Category ID"),
    categoryData: z.object({}).passthrough().describe("Category data in the same structure as returned by getCategory")
  },
  async ({ categoryId, categoryData }) => {
    try {
      const result = await categoriesTools.updateCategory(categoryId, categoryData);
      const filteredResult = filterCategoryFields(result);
      
      return {
        content: [{ type: "text", text: JSON.stringify(filteredResult, null, 2) }],
        resources: [{
          type: 'ProductCategory',
          id: result.categoryID,
          data: filterCategoryFields(result)
        } as Resource]
      };
    } catch (error) {
      console.error(`Error executing updateCategory: ${(error as Error).message}`);
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

server.tool(
  "deleteCategory",
  "Remove a product category from the Omnisend catalog by its unique identifier.",
  {
    categoryId: z.string().describe("Category ID")
  },
  async ({ categoryId }) => {
    try {
      const result = await categoriesTools.deleteCategory(categoryId);
      return {
        content: [{ type: "text", text: result ? "Category successfully deleted" : "Category was not deleted" }]
      };
    } catch (error) {
      console.error(`Error executing deleteCategory: ${(error as Error).message}`);
      return {
        content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
        isError: true
      };
    }
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();

try {
  await server.connect(transport);
} catch (error) {
  process.stderr.write(`Error connecting MCP server to transport: ${(error as Error).message}\n`);
  process.exit(1);
} 