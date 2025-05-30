import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export const registerCategoriesResource = (server: McpServer) => {
  server.resource(
    'Product category schema',
    'category://schema',
    {
      type: 'Product category schema',
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
      const schema = {
        type: 'Product category schema',
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
      };
      
      return {
        contents: [{
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify(schema, null, 2)
        }]
      };
    }
  );
}; 