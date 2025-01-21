
export function getOrdersData(products: any) {
  return products?.data?.docs || [];
}


export function getTotalPages(order: any, pageSize: number) {
  return Math.ceil((order?.data?.totalDocs || 0) / pageSize);
}