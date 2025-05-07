import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import * as contactsTools from '../../tools/contacts.js';
import { Resource } from '../../types/index.js';
import { filterContactFields } from '../shared/filters.js';
import { createPaginationContext } from '../shared/pagination.js';

export const registerContactsTools = (server: McpServer) => {
  // Register contacts tools
  server.tool(
    "listContacts",
    "Retrieve a list of contacts from Omnisend. Each contact can be identified by multiple identifiers (email, phone) with corresponding channels. The response includes pagination information (next/previous cursor, limit, offset).",
    {
      limit: z.number().optional().describe("Maximum number of contacts to return"),
      offset: z.number().optional().describe("Skip first N results"),
      status: z.enum(["subscribed", "unsubscribed", "nonSubscribed"]).optional().describe("Filter contacts by subscription status")
    },
    async ({ limit, offset, status }) => {
      try {
        const result = await contactsTools.listContacts({ limit, offset, status });
        
        // Create filtered response with only the defined fields
        const filteredResult = {
          contacts: result.contacts.map(filterContactFields),
          paging: result.paging
        };
        
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify(filteredResult, null, 2)
          }],
          resources: result.contacts?.map(contact => ({
            type: 'Contact',
            id: contact.contactID,
            data: filterContactFields(contact)
          } as Resource)) || [],
          context: createPaginationContext(result.paging)
        };
      } catch (error) {
        console.error(`Error executing listContacts: ${(error as Error).message}`);
        return {
          content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
          isError: true
        };
      }
    }
  );

  server.tool(
    "createContact",
    "Create or update a contact in Omnisend. Contact data can include identifiers (email, phone), personal information, subscription status, and custom properties.",
    {
      contactData: z.object({}).passthrough().describe("Contact data")
    },
    async ({ contactData }) => {
      try {
        const result = await contactsTools.createOrUpdateContact(contactData);
        const filteredResult = filterContactFields(result);
        
        return {
          content: [{ type: "text", text: JSON.stringify(filteredResult, null, 2) }],
          resources: [{
            type: 'Contact',
            id: result.contactID,
            data: filterContactFields(result)
          } as Resource]
        };
      } catch (error) {
        console.error(`Error executing createContact: ${(error as Error).message}`);
        return {
          content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
          isError: true
        };
      }
    }
  );

  server.tool(
    "getContact",
    "Retrieve detailed information about a specific contact by their unique identifier.",
    {
      contactId: z.string().describe("Contact ID")
    },
    async ({ contactId }) => {
      try {
        const result = await contactsTools.getContact(contactId);
        const filteredResult = filterContactFields(result);
        
        return {
          content: [{ type: "text", text: JSON.stringify(filteredResult, null, 2) }],
          resources: [{
            type: 'Contact',
            id: result.contactID,
            data: filterContactFields(result)
          } as Resource]
        };
      } catch (error) {
        console.error(`Error executing getContact: ${(error as Error).message}`);
        return {
          content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
          isError: true
        };
      }
    }
  );

  server.tool(
    "updateContact",
    "Update an existing contact's information. IMPORTANT: You must first get the contact using getContact and preserve the returned structure when updating. The update request requires the same structure as returned by the GET method, with only your desired changes applied.",
    {
      contactId: z.string().describe("Contact ID"),
      contactData: z.object({}).passthrough().describe("Contact data in the same structure as returned by getContact")
    },
    async ({ contactId, contactData }) => {
      try {
        const result = await contactsTools.updateContact(contactId, contactData);
        const filteredResult = filterContactFields(result);
        
        return {
          content: [{ type: "text", text: JSON.stringify(filteredResult, null, 2) }],
          resources: [{
            type: 'Contact',
            id: result.contactID,
            data: filterContactFields(result)
          } as Resource]
        };
      } catch (error) {
        console.error(`Error executing updateContact: ${(error as Error).message}`);
        return {
          content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
          isError: true
        };
      }
    }
  );
}; 