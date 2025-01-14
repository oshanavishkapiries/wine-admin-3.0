import { z } from 'zod';

// Schema for individual pack items
const packSchema = z.object({
  packSize: z.number().min(1, 'Pack size must be at least 1'),
  packCost: z.number().min(0, 'Pack cost cannot be negative'),
  packPrice: z.number().min(0, 'Pack price cannot be negative'),
});

// Main product schema
export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  regions: z.array(z.string().min(1, 'Region ID is required')).nonempty('At least one region is required'),
  subRegions: z.array(z.string().min(1, 'Sub-region ID is required')).nonempty('At least one sub-region is required'),
  categories: z.array(z.string().min(1, 'Category ID is required')).nonempty('At least one category is required'),
  subCategories: z.array(z.string().min(1, 'Sub-category ID is required')).nonempty('At least one sub-category is required'),
  vintage: z.string().optional(),
  dryness: z.string().min(1, 'Dryness is required'),
  size: z.string().min(1, 'Size is required'),
  type: z.array(z.string().min(1, 'Type ID is required')).nonempty('At least one type is required'),
  abv: z.number().min(0, 'ABV cannot be negative').max(100, 'ABV cannot exceed 100%'),
  rating: z.number().min(0, 'Rating cannot be negative').max(5, 'Rating cannot exceed 5'),
  greatForGift: z.boolean(),
  image: z.string().url('Image must be a valid URL').optional(),
  unitPrice: z.number().min(0, 'Unit price cannot be negative'),
  unitCost: z.number().min(0, 'Unit cost cannot be negative'),
  qtyOnHand: z.number().min(0, 'Quantity on hand cannot be negative'),
  isPack: z.boolean(),
  pack: z.array(packSchema).optional(),
  inStock: z.boolean(),
  isActive: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productSchema>;