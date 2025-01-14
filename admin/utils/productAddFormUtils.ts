export const countryOptions = (metaData: any) => {
  return metaData?.data?.country?.map((country: any) => ({
    value: country._id,
    label: country.name,
  }));
};

export const regionOptions = (metaData: any, countryId: string) => {
  const country = metaData?.data?.country?.find(
    (country: any) => country._id === countryId
  );
  return country?.regions?.map((region: any) => ({
    value: region._id,
    label: region.region,
  }));
};

export const subRegionOptions = (metaData: any, regions: any[]) => {
  const subRegions: any[] = [];

  regions.forEach((regionId) => {
    const region = metaData?.data?.country
      ?.flatMap((country: any) => country.regions)
      ?.find((region: any) => region._id === regionId);

    if (region?.subRegions) {
      subRegions.push(...region.subRegions);
    }
  });

  return subRegions.map((subRegion) => ({
    value: subRegion._id,
    label: subRegion.name,
  }));
};

export const categoryOptions = (metaData: any) => {
  return metaData?.data?.wineCategories?.map((category: any) => ({
    value: category._id,
    label: category.name,
  }));
};

export const subCategoryOptions = (metaData: any, categories: any[]) => {
  const subCategories: any[] = [];
  categories.forEach((categoryId: string) => {
    const category = metaData?.data?.wineCategories?.find(
      (category: any) => category._id === categoryId
    );
    category?.subCategories?.forEach((subCategory: any) => {
      subCategories.push({
        value: subCategory._id,
        label: subCategory.name,
      });
    });
  });
  return subCategories;
};
