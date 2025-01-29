const transformWineData = (input: any): any => {

  
  return {
    name: input.name || '',
    description: input.description || '',
    country: input.country?._id || '',
    regions: input.regions?._id || '',
    subRegions: input.subRegions?._id || '',
    categories: input.categories?._id || '',
    subCategories: input.subCategories?._id || '',
    vintage: input.vintage?.year?.toString() || '',
    dryness: input.dryness?._id || '',
    size: input.size?._id || '',
    type: input.type ? input.type.map((t: any) => t.name) : [],
    abv: input.abv || 0,
    rating: input.rating || 0,
    greatForGift: input.greatForGift || false,
    image: input.image || '',
    unitPrice: input.unitPrice || 0,
    unitCost: input.unitCost || 0,
    qtyOnHand: input.qtyOnHand || 0,
    isPack: input.isPack || false,
    pack: input.pack || [],
    inStock: input.inStock || true,
    isActive: input.isActive || true,
  };
};

export default transformWineData;
