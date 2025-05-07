import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import * as productsTools from '../../tools/products.js';
import { Resource } from '../../types/index.js';
import { filterProductFields } from '../shared/filters.js';
import { createPaginationContext } from '../shared/pagination.js';

export const registerProductsTools = (server: McpServer) => {
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
          context: createPaginationContext(result.paging)
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
}; 