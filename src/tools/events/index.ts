import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { sendEvent } from '../../api-resources/events/index.js';
import { filterEventFields } from '../../filters/events/index.js';

export const registerEventsTools = (server: McpServer) => {
  // Send event tool
  server.tool(
    "sendEvent",
    "Send a customer event to Omnisend. Events are used to track customer behavior and can trigger automations. Can be custom events or predefined system events.",
    {
      additionalProperties: false,
      properties: {
        eventData: {
          additionalProperties: false,
          description: "Event data",
          properties: {
            eventName: { description: "Event name", type: "string" },
            eventTime: { description: "Event time in RFC3339 format", type: "string" },
            eventVersion: { description: "Event version", type: "string" },
            contact: {
              additionalProperties: true,
              description: "Contact information",
              properties: {
                contactID: { type: "string" },
                email: { type: "string" },
                firstName: { type: "string" },
                lastName: { type: "string" },
                phone: { type: "string" }
              },
              type: "object"
            },
            properties: {
              additionalProperties: true,
              description: "Additional event properties",
              properties: {},
              type: "object"
            }
          },
          required: ["eventName", "contact"],
          type: "object"
        }
      },
      required: ["eventData"],
      type: "object"
    },
    async (args) => {
      try {
        const response = await sendEvent(args.eventData);
        
        // Filter event data to include only defined fields
        const filteredEvent = filterEventFields(response);
        
        return {
          content: [
            { 
              type: "text", 
              text: JSON.stringify(filteredEvent, null, 2) 
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