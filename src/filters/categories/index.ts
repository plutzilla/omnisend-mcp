// Filter function for category data
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