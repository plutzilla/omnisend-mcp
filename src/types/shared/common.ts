// MCP common types
export interface Resource {
  type: string;
  id: string;
  data: Record<string, unknown>;
}

// Common pagination interface
export interface Pagination {
  previous?: string;
  next?: string;
  limit?: number;
  offset?: number;
} 