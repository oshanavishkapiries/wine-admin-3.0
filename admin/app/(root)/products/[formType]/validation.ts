import { z } from 'zod';

const PackSchema = z.object({
  packSize: z.number().positive(),
  packCost: z.number().positive(),
  packPrice: z.number().positive(),
});

export const WineSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  country: z.string().min(1, 'At least one country is required'),
  regions: z.string().min(1, 'At least one region is required'),
  subRegions: z.string().min(1, 'At least one sub-region is required'),
  categories: z.string().min(1, 'At least one category is required'),
  subCategories: z.string().min(1, 'Sub-category ID is required'),
  vintage: z.string().min(4, 'Vintage must be a valid year'),
  dryness: z.string().min(1, 'At least one dryness is required'),
  size: z.string().min(1, 'At least one size is required'),
  type: z.array(z.string().min(1, 'Type ID is required')),
  abv: z.number().min(0, 'ABV must be a positive number'),
  rating: z.number().min(0).max(5, 'Rating must be between 0 and 5'),
  greatForGift: z.boolean(),
  image: z.string().url('Image is required'),
  unitPrice: z.number().positive('Unit price must be a positive number'),
  unitCost: z.number().positive('Unit cost must be a positive number'),
  qtyOnHand: z.number().min(0, 'Quantity on hand cannot be negative'),
  isPack: z.boolean(),
  pack: z.array(PackSchema).optional(),
  inStock: z.boolean(),
  isActive: z.boolean(),
});


export type ProductFormValues = z.infer<typeof WineSchema>;
