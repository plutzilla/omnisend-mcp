// Filter function for contact data
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