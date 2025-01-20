export const countryOptions = (metaData: any) => {
  return metaData?.data?.country?.map((country: any) => ({
    value: country._id,
    label: country.name,
  }));
};
