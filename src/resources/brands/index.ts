import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getCurrentBrand } from '../../api-resources/brands/index.js';
import { filterBrandFields } from '../../filters/brands/index.js';

export const registerBrandsResource = (server: McpServer) => {
  // Brand schema resource
  server.resource(
    'Brand schema',
    'brand://schema',
    {
      type: 'Brand schema',
      description: 'Represents brand information in Omnisend.',
      fields: {
        brandID: { type: 'string', description: 'Unique identifier of the brand' },
        website: { type: 'string', description: 'Website URL of the brand' },
        platform: { type: 'string', description: 'Platform name (e.g., "shopify", "woocommerce")' },
        version: { type: 'string', description: 'Integration version' },
        currency: { type: 'string', description: 'Default currency code for the brand' },
        createdAt: { type: 'string', description: 'Date when the brand was created' },
        updatedAt: { type: 'string', description: 'Date when the brand was last updated' }
      }
    },
    async (uri) => {
      const schema = {
        type: 'Brand schema',
        description: 'Represents brand information in Omnisend.',
        fields: {
          brandID: { type: 'string', description: 'Unique identifier of the brand' },
          website: { type: 'string', description: 'Website URL of the brand' },
          platform: { type: 'string', description: 'Platform name (e.g., "shopify", "woocommerce")' },
          version: { type: 'string', description: 'Integration version' },
          currency: { type: 'string', description: 'Default currency code for the brand' },
          createdAt: { type: 'string', description: 'Date when the brand was created' },
          updatedAt: { type: 'string', description: 'Date when the brand was last updated' }
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

  // Current brand data resource
  server.resource(
    'Brand information',
    'brand://current',
    {
      type: 'Brand information',
      description: 'Current brand information from Omnisend API.'
    },
    async (uri) => {
      try {
        const brandData = await getCurrentBrand();
        const filteredBrand = filterBrandFields(brandData);
        
        return {
          contents: [{
            uri: uri.href,
            mimeType: 'application/json',
            text: JSON.stringify(filteredBrand, null, 2)
          }]
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          contents: [{
            uri: uri.href,
            mimeType: 'application/json',
            text: JSON.stringify({ error: `Failed to fetch current brand: ${errorMessage}` }, null, 2)
          }]
        };
      }
    }
  );
}; 