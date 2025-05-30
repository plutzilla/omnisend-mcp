// Filter function for brand data
export const filterBrandFields = (brand: any) => {
  return {
    brandID: brand.brandID,
    website: brand.website,
    platform: brand.platform,
    version: brand.version,
    currency: brand.currency,
    createdAt: brand.createdAt,
    updatedAt: brand.updatedAt
  };
}; 