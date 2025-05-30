import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getCurrentBrand } from '../../api-resources/brands/index.js';
import { filterBrandFields } from '../../filters/brands/index.js';

export const registerBrandsTools = (server: McpServer) => {
  // Get current brand tool
  server.tool(
    "getCurrentBrand",
    "Retrieve information about the current brand from Omnisend. This includes brand ID, website, platform, version, currency, and other brand-related details.",
    {
      additionalProperties: false,
      properties: {},
      type: "object"
    },
    async () => {
      try {
        const response = await getCurrentBrand();
        
        // Filter brand data to include only defined fields
        const filteredBrand = filterBrandFields(response);
        
        return {
          content: [
            { 
              type: "text", 
              text: JSON.stringify(filteredBrand, null, 2) 
            }
          ]
        };
      } catch (error) {
        if (error instanceof Error) {
          return { content: [{ type: "text", text: `Error: ${error.message}` }] };
        }
        return { content: [{ type: "text", text: "An unknown error occurred" }] };
      }
    }
  );
}; 