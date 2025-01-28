'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  productDetails,
  ProductFormValues,
} from '@/lib/validations/product-details';
import ProductDetails from '@/components/sections/product/productForm/ProductDetails';
import SelectDetails from '@/components/sections/product/productForm/selectDetails';
import CheckBoxAndImage from '@/components/sections/product/productForm/checkBoxAndImage';

const ProductAddAndUpdate = () => {
  const params = useParams();
  const formType = params.formType as string;

  const productDefaultValues: Partial<ProductFormValues> = {
    name: 'Existing Product Name',
    description: 'Existing Product Description',
    abv: 50,
    rating: 4,
    vintage: 'Existing Vintage',
    country: 'us',
    region: 'north',
    subRegion: 'northeast',
    category: 'wine',
    varietal: 'cabernet',
    dryness: 'dry',
    size: '750ml',
    type: ['red', 'white'],
    inStock: false,
    isActive: false,
    greatForGift: false,
    imageUrl:
      'https://static.millesima.com/s3/attachements/editorial/h630px/how-many-ounces-in-a-glass-of-wine.jpg',
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productDetails),
    defaultValues: productDefaultValues,
  });
  
  console.log("watch()", watch())
  

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
        <SelectDetails
          register={register}
          errors={errors}
          defaultValues={productDefaultValues}
        />
        <CheckBoxAndImage
          register={register}
          errors={errors}
          defaultValues={productDefaultValues}
        />
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
