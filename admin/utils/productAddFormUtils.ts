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

export const subRegionOptions = (
  metaData: any,
  countryId: string | undefined,
  regionId: string | undefined
) => {
  const country = metaData?.data?.country?.find(
    (country: any) => country._id === countryId
  );
  const region = country?.regions?.find(
    (region: any) => region._id === regionId
  );
  return region?.subRegions?.map((subRegion: any) => ({
    value: subRegion._id,
    label: subRegion.name,
  }));
};

export const drynessOptions = (metaData: any) => {
  return metaData?.data?.drynessLevels?.map((dryness: any) => ({
    value: dryness._id,
    label: dryness.name,
  }));
};

export const sizesOptions = (metaData: any) => {
  return metaData?.data?.size?.map((size: any) => ({
    value: size._id,
    label: size.name,
  }));
};

export const categoriesOptions = (metaData: any) => {
  return metaData?.data?.wineCategories?.map((category: any) => ({
    value: category._id,
    label: category.name,
  }));
};

export const varientOptions = (
  metaData: any,
  categoryId: string | undefined
) => {
  const category = metaData?.data?.wineCategories?.find(
    (category: any) => category._id === categoryId
  );
  return category?.subCategories?.map((varient: any) => ({
    value: varient._id,
    label: varient.name,
  }));
};

export const typeOptions = (metaData: any) => {
  return metaData?.data?.type?.map((type: any) => ({
    value: type._id,
    label: type.name,
  }));
};

export const getCategoryById = (metaData: any, categoryId: string | undefined) => {
  return metaData?.data?.wineCategories?.find(
    (category: any) => category._id === categoryId
  );
};


export const categoryProfitMargin = (categoryId: string | undefined, metaData: any) => {
  const category = metaData?.data?.wineCategories?.find(
    (category: any) => category._id === categoryId
  );
  return category?.margin;
};
