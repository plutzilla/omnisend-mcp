import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import * as eventsTools from '../../tools/events.js';
import { Resource } from '../../types/index.js';
import { filterEventFields } from '../shared/filters.js';

export const registerEventsTools = (server: McpServer) => {
  // Register events tool
  server.tool(
    "sendEvent",
    "Send a customer event to Omnisend. Events are used to track customer behavior and can trigger automations. Can be custom events or predefined system events.",
    {
      eventData: z.object({
        eventName: z.string().describe("Event name"),
        contact: z.object({
          contactID: z.string().optional(),
          email: z.string().optional(),
          phone: z.string().optional(),
          firstName: z.string().optional(),
          lastName: z.string().optional()
        }).passthrough().describe("Contact information"),
        properties: z.object({}).passthrough().optional().describe("Additional event properties"),
        eventTime: z.string().optional().describe("Event time in RFC3339 format"),
        eventVersion: z.string().optional().describe("Event version")
      }).describe("Event data")
    },
    async ({ eventData }) => {
      try {
        const result = await eventsTools.sendEvent(eventData);
        const filteredResult = filterEventFields(result);
        
        return {
          content: [{ type: "text", text: JSON.stringify(filteredResult, null, 2) }],
          resources: [{
            type: 'Event',
            id: result.eventID,
            data: filterEventFields(result)
          } as Resource]
        };
      } catch (error) {
        console.error(`Error executing sendEvent: ${(error as Error).message}`);
        return {
          content: [{ type: "text", text: `Error: ${(error as Error).message}` }],
          isError: true
        };
      }
    }
  );
}; 