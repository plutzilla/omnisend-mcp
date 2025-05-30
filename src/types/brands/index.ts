export interface Brand {
  brandID: string;
  website?: string;
  platform?: string;
  version?: string;
  currency?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
} 