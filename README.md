# Omnisend MCP Server

A Model Context Protocol (MCP) server that integrates with Omnisend API V5.

## Features

- Contact management (list, create, get, update)
- Product management (list, create, get, replace, delete)
- Event tracking

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the root directory with your Omnisend API key:

```
OMNISEND_API_KEY=your_api_key_here
OMNISEND_API_URL=https://api.omnisend.com/v5
```

## Usage

To start the MCP server:

```bash
npm start
```

For use with VS Code, a configuration file is provided in `.vscode/mcp.json`.

## API Documentation

For more information about the Omnisend API, see the [official documentation](https://api-docs.omnisend.com/). 