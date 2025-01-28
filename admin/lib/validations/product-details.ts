import { z } from 'zod';

// Define the schema for CheckBoxAndImage
const checkBoxAndImageSchema = z.object({
  inStock: z.boolean(),
  isActive: z.boolean(),
  greatForGift: z.boolean(),
  imageUrl: z.string().optional(),
});

// Define the schema for SelectDetails
const selectDetailsSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  region: z.string().min(1, 'Region is required'),
  subRegion: z.string().min(1, 'Sub Region is required'),
  category: z.string().min(1, 'Category is required'),
  varietal: z.string().min(1, 'Varietal is required'),
  dryness: z.string().min(1, 'Dryness is required'),
  size: z.string().min(1, 'Size is required'),
  type: z.array(z.string()).min(1, 'At least one type is required'),
});

// Combine with the existing productDetails schema
export const productDetails = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Product description is required'),
  abv: z.number().min(0, 'ABV must be a positive number'),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  vintage: z.string().min(1, 'Product vintage is required'),
}).merge(selectDetailsSchema).merge(checkBoxAndImageSchema);

export type ProductFormValues = z.infer<typeof productDetails>;