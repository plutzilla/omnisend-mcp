# Omnisend MCP Server Changelog

## 2.1.0 (2025-05-05)

### Improvements

- Updated @modelcontextprotocol/sdk to version 1.11.0
- Improved error handling across all API tools
- Added request timeout configuration (10s) to prevent hanging connections
- Enhanced error messages with more detailed information
- Implemented Axios response interceptors for better error handling

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
