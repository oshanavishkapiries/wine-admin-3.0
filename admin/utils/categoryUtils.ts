import { Category } from "@/components/sections/category/columns";

export function getCategoryData(metaData: any): Category[] {
  const categoryData = metaData?.data?.wineCategories;
  const arr: Category[] = [];

  categoryData?.forEach((item: any) => {
    item.subCategories.forEach((subItem: any) => {
      arr.push({
        id: subItem._id,
        SubCategory: subItem.name,
        Category: item.name,
        ProfitMargin: item.margin + '%',
        categoryId: item._id,
      });
    });
  });

  return arr;
}

export function getCategoryOptions(metaData: any) {
  const categoryData = metaData?.data?.wineCategories;
  return categoryData?.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));
} 