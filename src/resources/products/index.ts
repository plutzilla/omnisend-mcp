import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export const registerProductsResource = (server: McpServer) => {
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
}; 