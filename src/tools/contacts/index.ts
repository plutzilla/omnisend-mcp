import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { listContacts, createOrUpdateContact, getContact, updateContact } from '../../api-resources/contacts/index.js';
import { filterContactFields } from '../../filters/contacts/index.js';

export const registerContactsTools = (server: McpServer) => {
  // List contacts tool
  server.tool(
    "listContacts",
    "Retrieve a list of contacts from Omnisend. Each contact can be identified by multiple identifiers (email, phone) with corresponding channels. The response includes pagination information (next/previous cursor, limit, offset).",
    {
      additionalProperties: false,
      properties: {
        limit: { description: "Maximum number of contacts to return", type: "number" },
        offset: { description: "Skip first N results", type: "number" },
        email: { description: "Filter contacts by email address", type: "string" },
        phone: { description: "Filter contacts by phone number", type: "string" },
        status: { description: "Filter contacts by subscription status", enum: ["subscribed", "unsubscribed", "nonSubscribed"], type: "string" },
        createdAfter: { description: "Filter contacts created after specified date (ISO format)", type: "string" },
        updatedAfter: { description: "Filter contacts updated after specified date (ISO format)", type: "string" },
        tags: { description: "Filter contacts by tags", items: { type: "string" }, type: "array" }
      },
      type: "object"
    },
    async (args) => {
      try {
        const response = await listContacts(args);
        
        // Filter contacts data to include only defined fields
        const filteredContacts = response.contacts.map(filterContactFields);
        
        return {
          content: [
            { 
              type: "text", 
              text: JSON.stringify({
                contacts: filteredContacts,
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

  // Create contact tool
  server.tool(
    "createContact",
    "Create or update a contact in Omnisend. Contact data can include identifiers (email, phone), personal information, subscription status, and custom properties.",
    {
      additionalProperties: false,
      properties: {
        contactData: { 
          additionalProperties: true,
          description: "Contact data", 
          properties: {},
          type: "object"
        }
      },
      required: ["contactData"],
      type: "object"
    },
    async (args) => {
      try {
        const response = await createOrUpdateContact(args.contactData);
        
        // Filter contact data to include only defined fields
        const filteredContact = filterContactFields(response);
        
        return {
          content: [
            { 
              type: "text", 
              text: JSON.stringify(filteredContact, null, 2) 
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

  // Get contact tool
  server.tool(
    "getContact",
    "Retrieve detailed information about a specific contact by their unique identifier.",
    {
      additionalProperties: false,
      properties: {
        contactId: { description: "Contact ID", type: "string" }
      },
      required: ["contactId"],
      type: "object"
    },
    async (args) => {
      try {
        const response = await getContact(args.contactId);
        
        // Filter contact data to include only defined fields
        const filteredContact = filterContactFields(response);
        
        return {
          content: [
            { 
              type: "text", 
              text: JSON.stringify(filteredContact, null, 2) 
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

  // Update contact tool
  server.tool(
    "updateContact",
    "Update an existing contact's information. IMPORTANT: You must first get the contact using getContact and preserve the returned structure when updating. The update request requires the same structure as returned by the GET method, with only your desired changes applied.",
    {
      additionalProperties: false,
      properties: {
        contactId: { description: "Contact ID", type: "string" },
        contactData: { 
          additionalProperties: true,
          description: "Contact data in the same structure as returned by getContact", 
          properties: {},
          type: "object" 
        }
      },
      required: ["contactId", "contactData"],
      type: "object"
    },
    async (args) => {
      try {
        const response = await updateContact(args.contactId, args.contactData);
        
        // Filter contact data to include only defined fields
        const filteredContact = filterContactFields(response);
        
        return {
          content: [
            { 
              type: "text", 
              text: JSON.stringify(filteredContact, null, 2) 
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