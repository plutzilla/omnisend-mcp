// Filter function for product data
export const filterProductFields = (product: any) => {
  return {
    productID: product.productID,
    title: product.title,
    status: product.status,
    description: product.description,
    currency: product.currency,
    price: product.price,
    oldPrice: product.oldPrice,
    productUrl: product.productUrl,
    imageUrl: product.imageUrl,
    vendor: product.vendor,
    variants: product.variants,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt
  };
}; 