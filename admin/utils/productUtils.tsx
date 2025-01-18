export function getProductsData(products: any) {
  return products?.data?.docs || [];
}


export function getTotalPages(products: any, pageSize: number) {
  return Math.ceil((products?.data?.totalDocs || 0) / pageSize);
}