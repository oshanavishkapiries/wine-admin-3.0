import { z } from 'zod';

export const productDetails = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Product description is required'),
  abv: z.number().min(0, 'ABV must be a positive number'),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  vintage: z.string().min(1, 'Vintage is required'),
});

export type ProductFormValues = z.infer<typeof productDetails>;