import { z } from 'zod';

const packSchema = z.object({
  packSize: z.number().min(1, 'Pack size must be at least 1'),
  packCost: z.number().min(0, 'Pack cost cannot be negative'),
  packPrice: z.number().min(0, 'Pack price cannot be negative'),
});

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  regions: z.string().optional(),
  subRegions: z.string().optional(),
  categories: z.string().optional(),
  subCategories: z.string().optional(),
  vintage: z.string().optional(),
  dryness: z.string().min(1, 'Dryness is required'),
  size: z.string().min(1, 'Size is required'),
  type: z
    .array(z.string().min(1, 'Type ID is required'))
    .nonempty('At least one type is required'),
  abv: z
    .number()
    .min(1, 'ABV cannot be less than 1%')
    .max(100, 'ABV cannot exceed 100%'),
  rating: z
    .number()
    .min(0, 'Rating cannot be negative')
    .max(5, 'Rating cannot exceed 5'),
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
