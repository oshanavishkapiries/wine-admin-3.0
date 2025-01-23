export const getSubCategory = (metaData: any) => {
  const arr: any[] = [];

  metaData?.data?.wineCategories?.map((item: any) => {
    item.subCategories.map((subItem: any) => {
      arr.push({
        _id: subItem._id,
        subCategoryName: subItem.name,
        categoryName: item.name,
        categoryId: item._id,
      });
    });
  });

  return arr;
};

export const getCategoryOptions = (metaData: any) => {
  return metaData?.data?.wineCategories?.map((item: any) => ({
    value: item._id,
    label: item.name,
  }));
};

export const getCategories = (metaData: any) => {
  return metaData?.data?.wineCategories;
};
