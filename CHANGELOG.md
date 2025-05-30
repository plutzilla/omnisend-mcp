# Omnisend MCP Server Changelog

## 2.3.0 (2025-01-28)

### New Features

- **Brand Information Support**: Added complete integration with Omnisend `/v5/brands/current` endpoint
  - New `getCurrentBrand` tool for retrieving current brand data
  - New `Brand information` resource for live brand data access
  - New `Brand schema` resource with proper JSON schema definition
- **MCP Inspector Integration**: Added debugging and testing capabilities
  - New `npm run inspect` script for basic inspector usage
  - New `npm run inspect:env` script with explicit environment variable setup
  - Visual testing interface for all tools and resources
  - Real-time debugging of MCP communication

### Improvements

- **Enhanced Schema Resources**: All schema resources now return proper serialized JSON instead of dummy text
  - Contact schema, Product schema, Product category schema, Event schema, Brand schema
  - Proper `application/json` MIME type for all schema responses
- **Human-Readable Resource Names**: Improved resource naming convention
  - Added "schema" suffix to all schema resources for clarity
  - Renamed `brand://current` resource to "Brand information"
- **Enhanced Documentation**: Comprehensive debugging and testing guide added to README
  - Detailed MCP Inspector usage instructions
  - Updated features list and version information

### Technical Improvements

- Consistent error handling across all brand-related functionality
- Proper TypeScript typing for brand interfaces and responses
- Modular architecture maintained with new brand domain
- Enhanced filtering for brand data responses

## 2.2.0 (2025-05-10)

### Improvements

- Refactored codebase to a more modular structure
- Implemented domain-specific modules (contacts, products, categories, events)
- Organized code into logical directories (/types, /filters, /api-resources, /resources, /tools)
- Made server version dynamic in the ping tool
- Added better error handling in API requests
- Improved code maintainability with barrel exports
- Removed redundant and duplicate code

### Code Improvements

- Separated concerns between API clients, filters, resources, and tools
- Enhanced type definitions with proper domain-specific interfaces
- Improved code organization for better maintainability
- Implemented consistent error handling across all modules

## 2.1.0 (2025-05-05)

### Improvements

- Updated @modelcontextprotocol/sdk to version 1.11.0
- Improved error handling across all API tools
- Added request timeout configuration (10s) to prevent hanging connections
- Enhanced error messages with more detailed information
- Implemented Axios response interceptors for better error handling
- Added cursor-based pagination context in MCP responses (next/previous URLs, limit/offset)

### Bug Fixes

- Fixed SSE connection issues with MCP Inspector
- Optimized console output to be compatible with MCP clients
- Replaced console.error with process.stderr.write to avoid JSON parsing errors
- Improved error type handling to avoid type casting issues

## 2.0.0 (2025-05-01)

### Major Changes

- Migrated entire codebase from JavaScript to TypeScript
- Updated MCP resource structure according to latest MCP specification
- Added proper type declarations for all API responses and requests

### Code Improvements

- Added comprehensive TypeScript interfaces for all Omnisend API objects
- Improved error handling with typed exceptions
- Enhanced code organization and maintainability
- Implemented proper ESM imports
- Added TypeScript configuration and build process

## 1.0.0 (2025-04-15)

### Initial Release

- Basic MCP server implementation with JavaScript
- Omnisend API integration
- Support for contacts, products, events, and categories
- Simple error handling and logging
