// Helper functions to filter data based on resource definitions
export const filterContactFields = (contact: any) => {
  return {
    contactID: contact.contactID,
    email: contact.email,
    phone: contact.phone,
    firstName: contact.firstName,
    lastName: contact.lastName,
    status: contact.status,
    tags: contact.tags,
    identifiers: contact.identifiers,
    createdAt: contact.createdAt,
    updatedAt: contact.updatedAt,
    // Include added fields
    country: contact.country,
    state: contact.state,
    city: contact.city,
    gender: contact.gender,
    birthdate: contact.birthdate
  };
};

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

export const filterCategoryFields = (category: any) => {
  return {
    categoryID: category.categoryID,
    title: category.title,
    handle: category.handle,
    description: category.description,
    imageUrl: category.imageUrl,
    categoryUrl: category.categoryUrl,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt
  };
};

export const filterEventFields = (event: any) => {
  return {
    eventID: event.eventID,
    eventName: event.eventName,
    email: event.email,
    phone: event.phone,
    contactID: event.contactID,
    contact: event.contact ? filterContactFields(event.contact) : undefined,
    properties: event.properties,
    createdAt: event.createdAt
  };
}; 