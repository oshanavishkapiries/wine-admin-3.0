import * as z from "zod";

export const categorySchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  subCategoryName: z.string().min(1, "Sub category name is required"),
  margin: z.number()
    .min(0, "Margin must be at least 0")
    .max(100, "Margin cannot exceed 100"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>; 