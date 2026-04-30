export interface BookFilterQuery {
    pageNumber?: number;
    pageSize?: number;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price_asc' | 'price_desc';
  }
  
  export const defaultBookFilterQuery: BookFilterQuery = {
    pageNumber: 1,
    pageSize: 20,
  };