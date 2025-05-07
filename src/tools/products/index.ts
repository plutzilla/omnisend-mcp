import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { listProducts, createProduct, getProduct, replaceProduct, deleteProduct } from '../../api-resources/products/index.js';
import { filterProductFields } from '../../filters/products/index.js';

export const registerProductsTools = (server: McpServer) => {
  // List products tool
  server.tool(
    "listProducts",
    "Retrieve a list of products from the Omnisend catalog with pagination support. The response includes pagination information (next/previous cursor, limit, offset).",
    {
      additionalProperties: false,
      properties: {
        limit: { description: "Maximum number of products to return", type: "number" },
        offset: { description: "Skip first N results", type: "number" },
        status: { description: "Filter products by status", enum: ["active", "draft", "archived"], type: "string" },
        vendor: { description: "Filter products by vendor/brand", type: "string" },
        createdAfter: { description: "Filter products created after specified date (ISO format)", type: "string" },
        updatedAfter: { description: "Filter products updated after specified date (ISO format)", type: "string" },
        categories: { description: "Filter products by categories", items: { type: "string" }, type: "array" },
        tags: { description: "Filter products by tags", items: { type: "string" }, type: "array" }
      },
      type: "object"
    },
    async (args) => {
      try {
        const response = await listProducts(args);
        
        // Filter products data to include only defined fields
        const filteredProducts = response.products.map(filterProductFields);
        
        return {
          content: [
            { 
              type: "text", 
              text: JSON.stringify({
                products: filteredProducts,
                paging: response.paging
              }, null, 2) 
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

  // Create product tool
  server.tool(
    "createProduct",
    "Create a new product in the Omnisend catalog. Product data can include details like title, description, variants, images, price, and more.",
    {
      additionalProperties: false,
      properties: {
        productData: { 
          additionalProperties: true,
          description: "Product data", 
          properties: {},
          type: "object"
        }
      },
      required: ["productData"],
      type: "object"
    },
    async (args) => {
      try {
        const response = await createProduct(args.productData);
        
        // Filter product data to include only defined fields
        const filteredProduct = filterProductFields(response);
        
        return {
          content: [
            { 
              type: "text", 
              text: JSON.stringify(filteredProduct, null, 2) 
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

  // Get product tool
  server.tool(
    "getProduct",
    "Retrieve detailed information about a specific product by its unique identifier.",
    {
      additionalProperties: false,
      properties: {
        productId: { description: "Product ID", type: "string" }
      },
      required: ["productId"],
      type: "object"
    },
    async (args) => {
      try {
        const response = await getProduct(args.productId);
        
        // Filter product data to include only defined fields
        const filteredProduct = filterProductFields(response);
        
        return {
          content: [
            { 
              type: "text", 
              text: JSON.stringify(filteredProduct, null, 2) 
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

  // Replace product tool
  server.tool(
    "replaceProduct",
    "Replace an existing product with new data. IMPORTANT: You must first get the product using getProduct and preserve the returned structure when replacing. The replace request requires the same structure as returned by the GET method, with only your desired changes applied.",
    {
      additionalProperties: false,
      properties: {
        productId: { description: "Product ID", type: "string" },
        productData: { 
          additionalProperties: true,
          description: "Product data in the same structure as returned by getProduct", 
          properties: {},
          type: "object" 
        }
      },
      required: ["productId", "productData"],
      type: "object"
    },
    async (args) => {
      try {
        const response = await replaceProduct(args.productId, args.productData);
        
        // Filter product data to include only defined fields
        const filteredProduct = filterProductFields(response);
        
        return {
          content: [
            { 
              type: "text", 
              text: JSON.stringify(filteredProduct, null, 2) 
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

  // Delete product tool
  server.tool(
    "deleteProduct",
    "Remove a product from the Omnisend catalog by its unique identifier.",
    {
      additionalProperties: false,
      properties: {
        productId: { description: "Product ID", type: "string" }
      },
      required: ["productId"],
      type: "object"
    },
    async (args) => {
      try {
        const success = await deleteProduct(args.productId);
        
        return {
          content: [
            { 
              type: "text", 
              text: success ? "Product deleted successfully" : "Failed to delete product" 
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