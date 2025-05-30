import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { registerContactsResource } from './contacts/index.js';
import { registerProductsResource } from './products/index.js';
import { registerCategoriesResource } from './categories/index.js';
import { registerEventsResource } from './events/index.js';
import { registerBrandsResource } from './brands/index.js';

export const registerAllResources = (server: McpServer) => {
  registerContactsResource(server);
  registerProductsResource(server);
  registerCategoriesResource(server);
  registerEventsResource(server);
  registerBrandsResource(server);
}; 