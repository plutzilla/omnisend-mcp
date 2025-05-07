import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export const registerResources = (server: McpServer) => {
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
}; 