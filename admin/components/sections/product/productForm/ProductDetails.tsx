import React from 'react';
import InputForm from '@/components/form/InputForm';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProductFormValues } from '@/lib/validations/product-details';

interface ProductDetailsProps {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ register, errors }) => {
  return (
    <div className="flex flex-col gap-4 my-3 border-t-2 border-gray-200 pb-4">
      <h2 className="text-lg font-bold mt-4">Product Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InputForm
          label="Product Name"
          placeholder="Name"
          register={register('name')}
          error={errors.name?.message}
        />
        <InputForm
          label="Product Description"
          placeholder="Description"
          register={register('description')}
          error={errors.description?.message}
        />
        <InputForm
          label="Product ABV (%)"
          placeholder="ABV"
          type="number"
          register={register('abv', { valueAsNumber: true })}
          error={errors.abv?.message}
        />
        <InputForm
          label="Product Rating (1-5)"
          placeholder="Rating"
          type="number"
          register={register('rating', { valueAsNumber: true })}
          error={errors.rating?.message}
        />
        <InputForm
          label="Product Vintage"
          placeholder="Vintage"
          register={register('vintage')}
          error={errors.vintage?.message}
        />
      </div>
    </div>
  );
};

export default ProductDetails;