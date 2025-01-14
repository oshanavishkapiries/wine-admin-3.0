'use client';
import Dropdown from '@/components/form/DropDownForm';
import InputForm from '@/components/form/InputForm';
import MultiselectForm from '@/components/form/MultiselectForm';
import { useGetMetaQuery } from '@/features/api/metaSlice';
import { ProductFormValues, productSchema } from '@/lib/validations/product';
import {
  categoryOptions,
  countryOptions,
  regionOptions,
  subCategoryOptions,
  subRegionOptions,
} from '@/utils/productAddFormUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ProductAdd = () => {
  const { data: metaData } = useGetMetaQuery(undefined, {
    pollingInterval: 40000,
    refetchOnMountOrArgChange: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      abv: 0,
      rating: 0,
      vintage: '',
      country: '',
      regions: [],
      subRegions: [],
      categories: [],
      subCategories: [],
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log('data', data);
  };

  const formValues = watch();

  console.log('formValues', formValues);
  console.log('metaData', metaData);

  return (
    <div className="w-full h-full p-3">
      <h1 className="text-2xl font-bold">title</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
        {/* section */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          {/* left */}
          <div className="col-span-1 w-full space-y-2">
            {/* product name */}
            <InputForm
              label={'Product Name'}
              placeholder={'Name'}
              type={'text'}
              register={register('name')}
              error={errors.name?.message}
              required
            />

            {/* product description */}
            <InputForm
              label={'Product Description'}
              placeholder={'Description'}
              type={'text'}
              register={register('description')}
              error={errors.description?.message}
            />

            {/* product ABV */}
            <InputForm
              label={'Product ABV'}
              placeholder={'ABV'}
              type={'number'}
              register={register('abv', { valueAsNumber: true })}
              error={errors.abv?.message}
              required
            />

            {/* product rating */}
            <InputForm
              label={'Product Rating'}
              placeholder={'Rating'}
              type={'number'}
              register={register('rating', { valueAsNumber: true })}
              error={errors.rating?.message}
            />

            {/* product vintage */}
            <InputForm
              label={'Product Vintage'}
              placeholder={'Vintage'}
              type={'text'}
              register={register('vintage')}
              error={errors.vintage?.message}
            />
          </div>
          {/* center */}
          <div className="col-span-1 w-full space-y-2">
            {/* country */}
            <Dropdown
              disabled={!metaData}
              label="Country"
              options={countryOptions(metaData)}
              onSelect={(value) => {
                reset({
                  ...formValues,
                  country: value,
                  regions: [],
                });
              }}
              buttonVariant="outline"
              error={errors.country?.message}
              required
            />
            {/* regions */}
            <MultiselectForm
              label={'Regions'}
              disabled={!formValues.country}
              options={regionOptions(metaData, formValues.country)}
              onSelect={(value) => {
                reset({
                  ...formValues,
                  regions: value.map((region) => region.value),
                });
              }}
              error={errors.regions?.message}
              required
            />
            {/* subRegions */}
            <MultiselectForm
              label={'Sub Regions'}
              disabled={!formValues.country}
              options={subRegionOptions(metaData, formValues.regions)}
              onSelect={(value) => {
                console.log('value', value);
              }}
              error={errors.subRegions?.message}
            />

            {/* category */}
            <MultiselectForm
              label={'Category'}
              disabled={!metaData}
              options={categoryOptions(metaData)}
              onSelect={(value) => {
                reset({
                  ...formValues,
                  categories: value.map((category) => category.value),
                });
              }}
              error={errors.categories?.message}
              required
            />

            {/* Varietal */}
            <MultiselectForm
              label={'Varietal'}
              disabled={!formValues.categories.length}
              options={subCategoryOptions(metaData, formValues.categories)}
              onSelect={(value) => {
                reset({
                  ...formValues,
                  subCategories: value.map((subCategory) => subCategory.value),
                });
              }}
              error={errors.subCategories?.message}
            />
          </div>
          {/* right */}
          <div className="col-span-1 w-full space-y-2"></div>
        </div>

        <button
          type="submit"
          className="px-4 mt-2 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          test
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
