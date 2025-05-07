import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export const registerCategoriesResource = (server: McpServer) => {
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