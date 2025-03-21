import { ProductFormValues } from './validation';

export const defaultProductValues: ProductFormValues = {
  name: '',
  description: '',
  country: '',
  regions: '',
  subRegions: '',
  categories: '',
  subCategories: '',
  vintage: '',
  dryness: '',
  size: '',
  type: [],
  abv: 0,
  rating: 0,
  greatForGift: false,
  image: '',
  unitPrice: 0,
  unitCost: 0,
  qtyOnHand: 0,
  isPack: false,
  pack: [],
  inStock: true,
  isActive: true,
  margin:0,
};
