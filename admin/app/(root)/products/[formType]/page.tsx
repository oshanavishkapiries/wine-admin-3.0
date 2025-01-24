'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productDetails, ProductFormValues } from '@/lib/validations/product-details';
import ProductDetails from '@/components/sections/product/productForm/ProductDetails';
import SelectDetails from '@/components/sections/product/productForm/selectDetails';

const ProductAddAndUpdate = () => {
  const params = useParams();
  const formType = params.formType as string;

  const productDefaultValues = {
    // name: 'Existing Product Name',
    // description: 'Existing Product Description',
    // abv: 5.5,
    // rating: 4,
    // vintage: 'Existing Category',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productDetails),
    defaultValues: productDefaultValues,
  });

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    console.log('Form Data:', data);
    // Handle form submission, e.g., send data to an API
  };

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-xl font-bold uppercase flex items-center gap-2">
        {formType === 'product-add' ? 'Product Add' : 'Product Edit'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ProductDetails register={register} errors={errors} />
        <SelectDetails />
        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductAddAndUpdate;