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
