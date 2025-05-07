import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { listCategories, createCategory, getCategory, updateCategory, deleteCategory } from '../../api-resources/categories/index.js';
import { filterCategoryFields } from '../../filters/categories/index.js';

export const registerCategoriesTools = (server: McpServer) => {
  // List categories tool
  server.tool(
    "listCategories",
    "Retrieve a list of product categories from the Omnisend catalog with pagination support. The response includes pagination information (next/previous cursor, limit, offset).",
    {
      additionalProperties: false,
      properties: {
        limit: { description: "Maximum number of categories to return", type: "number" },
        offset: { description: "Skip first N results", type: "number" }
      },
      type: "object"
    },
    async (args) => {
      try {
        const response = await listCategories(args);
        
        // Filter categories data to include only defined fields
        const filteredCategories = response.categories.map(filterCategoryFields);
        
        return {
          content: [
            { 
              type: "text", 
              text: JSON.stringify({
                categories: filteredCategories,
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

  // Create category tool
  server.tool(
    "createCategory",
    "Create a new product category in the Omnisend catalog. Category data can include title, description, image, and URL.",
    {
      additionalProperties: false,
      properties: {
        categoryData: { 
          additionalProperties: true,
          description: "Product category data", 
          properties: {},
          type: "object"
        }
      },
      required: ["categoryData"],
      type: "object"
    },
    async (args) => {
      try {
        const response = await createCategory(args.categoryData);
        
        // Filter category data to include only defined fields
        const filteredCategory = filterCategoryFields(response);
        
        return {
          content: [
            { 
              type: "text", 
              text: JSON.stringify(filteredCategory, null, 2) 
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

  // Get category tool
  server.tool(
    "getCategory",
    "Retrieve detailed information about a specific product category by its unique identifier.",
    {
      additionalProperties: false,
      properties: {
        categoryId: { description: "Category ID", type: "string" }
      },
      required: ["categoryId"],
      type: "object"
    },
    async (args) => {
      try {
        const response = await getCategory(args.categoryId);
        
        // Filter category data to include only defined fields
        const filteredCategory = filterCategoryFields(response);
        
        return {
          content: [
            { 
              type: "text", 
              text: JSON.stringify(filteredCategory, null, 2) 
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

  // Update category tool
  server.tool(
    "updateCategory",
    "Update an existing product category. IMPORTANT: You must first get the category using getCategory and preserve the returned structure when updating.",
    {
      additionalProperties: false,
      properties: {
        categoryId: { description: "Category ID", type: "string" },
        categoryData: { 
          additionalProperties: true,
          description: "Category data in the same structure as returned by getCategory", 
          properties: {},
          type: "object" 
        }
      },
      required: ["categoryId", "categoryData"],
      type: "object"
    },
    async (args) => {
      try {
        const response = await updateCategory(args.categoryId, args.categoryData);
        
        // Filter category data to include only defined fields
        const filteredCategory = filterCategoryFields(response);
        
        return {
          content: [
            { 
              type: "text", 
              text: JSON.stringify(filteredCategory, null, 2) 
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

  // Delete category tool
  server.tool(
    "deleteCategory",
    "Remove a product category from the Omnisend catalog by its unique identifier.",
    {
      additionalProperties: false,
      properties: {
        categoryId: { description: "Category ID", type: "string" }
      },
      required: ["categoryId"],
      type: "object"
    },
    async (args) => {
      try {
        const success = await deleteCategory(args.categoryId);
        
        return {
          content: [
            { 
              type: "text", 
              text: success ? "Category deleted successfully" : "Failed to delete category" 
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