'use client';
import { useGetMetaQuery } from '@/features/api/metaSlice';
import {
  productSchema,
  type ProductFormValues,
} from './testProduct';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const ProductAdd = () => {
  const { data: metaData } = useGetMetaQuery(undefined, {
    pollingInterval: 40000,
    refetchOnMountOrArgChange: true,
  });

  const defaultValues = {
    name: 'eded',
    description: 'dede',
    age: 12,
  };

  const isUpdateMode = true;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: isUpdateMode ? defaultValues : {},
  });

  const onSubmit = (data: ProductFormValues) => {
    if (isUpdateMode) {
      console.log('Updating product:', data);
      // Call your update API here
    } else {
      console.log('Adding product:', data);
      // Call your add API here
    }
  };

  return (
    <div className="w-full h-full p-3">
      <h1 className="text-2xl font-bold">
        {isUpdateMode ? 'Update Product' : 'Add Product'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="col-span-1 w-full space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="col-span-1 w-full space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              {...register('description')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="col-span-1 w-full space-y-2">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              {...register('age', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.age && (
              <p className="text-sm text-red-500">{errors.age.message}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            {isUpdateMode ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductAdd;
