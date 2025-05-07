// Helper function to create pagination context from API response
export const createPaginationContext = (paging?: { next?: string; previous?: string; limit?: number; offset?: number }) => {
  if (!paging) return undefined;
  
  return {
    pagination: {
      next: paging.next,
      previous: paging.previous,
      limit: paging.limit,
      offset: paging.offset
    }
  };
}; 