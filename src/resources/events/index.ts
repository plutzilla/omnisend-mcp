import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export const registerEventsResource = (server: McpServer) => {
  server.resource(
    'Event',
    'event://schema',
    {
      type: 'Event',
      description: 'Represents a customer event in Omnisend.',
      fields: {
        eventID: { type: 'string', description: 'Unique identifier of the event' },
        eventName: { type: 'string', description: 'Name of the event (e.g., "placed order", "viewed product")' },
        email: { type: 'string', description: 'Email address of the contact who triggered the event' },
        phone: { type: 'string', description: 'Phone number of the contact who triggered the event' },
        contactID: { type: 'string', description: 'ID of the contact who triggered the event' },
        contact: { type: 'object', description: 'Contact information' },
        properties: { type: 'object', description: 'Additional event properties' },
        createdAt: { type: 'string', description: 'Date when the event occurred' }
      }
    },
    async (uri) => {
      return {
        contents: [{
          uri: uri.href,
          text: "Event schema definition"
        }]
      };
    }
  );
}; 