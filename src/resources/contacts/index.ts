import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export const registerContactsResource = (server: McpServer) => {
  server.resource(
    'Contact schema',
    'contact://schema',
    {
      type: 'Contact schema',
      description: 'Represents a contact in Omnisend. Each contact can be identified by multiple identifiers (email, phone) with corresponding channels.',
      fields: {
        contactID: { type: 'string', description: 'Unique identifier of the contact' },
        email: { type: 'string', description: 'Email address of the contact' },
        phone: { type: 'string', description: 'Phone number of the contact' },
        firstName: { type: 'string', description: 'First name of the contact' },
        lastName: { type: 'string', description: 'Last name of the contact' },
        status: { type: 'string', description: 'Subscription status: subscribed, unsubscribed, nonSubscribed' },
        tags: { type: 'array', description: 'Tags associated with the contact' },
        identifiers: { type: 'array', description: 'Identifiers for the contact (email, phone)' },
        createdAt: { type: 'string', description: 'Date when the contact was created' },
        updatedAt: { type: 'string', description: 'Date when the contact was last updated' },
        country: { type: 'string', description: 'Country of the contact' },
        state: { type: 'string', description: 'State/region of the contact' },
        city: { type: 'string', description: 'City of the contact' },
        gender: { type: 'string', description: 'Gender of the contact' },
        birthdate: { type: 'string', description: 'Birth date of the contact in ISO format' }
      }
    },
    async (uri) => {
      const schema = {
        type: 'Contact schema',
        description: 'Represents a contact in Omnisend. Each contact can be identified by multiple identifiers (email, phone) with corresponding channels.',
        fields: {
          contactID: { type: 'string', description: 'Unique identifier of the contact' },
          email: { type: 'string', description: 'Email address of the contact' },
          phone: { type: 'string', description: 'Phone number of the contact' },
          firstName: { type: 'string', description: 'First name of the contact' },
          lastName: { type: 'string', description: 'Last name of the contact' },
          status: { type: 'string', description: 'Subscription status: subscribed, unsubscribed, nonSubscribed' },
          tags: { type: 'array', description: 'Tags associated with the contact' },
          identifiers: { type: 'array', description: 'Identifiers for the contact (email, phone)' },
          createdAt: { type: 'string', description: 'Date when the contact was created' },
          updatedAt: { type: 'string', description: 'Date when the contact was last updated' },
          country: { type: 'string', description: 'Country of the contact' },
          state: { type: 'string', description: 'State/region of the contact' },
          city: { type: 'string', description: 'City of the contact' },
          gender: { type: 'string', description: 'Gender of the contact' },
          birthdate: { type: 'string', description: 'Birth date of the contact in ISO format' }
        }
      };
      
      return {
        contents: [{
          uri: uri.href,
          mimeType: 'application/json',
          text: JSON.stringify(schema, null, 2)
        }]
      };
    }
  );
}; 