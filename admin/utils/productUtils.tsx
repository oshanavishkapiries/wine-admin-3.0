export function getProductsData(products: any) {
  return products?.data?.docs || [];
}
