import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import * as categoriesTools from '../../tools/categories.js';
import { Resource } from '../../types/index.js';
import { filterCategoryFields } from '../shared/filters.js';
import { createPaginationContext } from '../shared/pagination.js';

export const registerCategoriesTools = (server: McpServer) => {
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
          context: createPaginationContext(result.paging)
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
}; 