'use client';
import CheckBoxForm from '@/components/form/CheckBoxForm';
import Dropdown from '@/components/form/DropDownForm';
import ImageUploadForm from '@/components/form/ImageUploadForm';
import InputForm from '@/components/form/InputForm';
import MultiselectForm from '@/components/form/MultiselectForm';
import { Button } from '@/components/ui/button';
import { useGetMetaQuery } from '@/features/api/metaSlice';
import { ProductFormValues, productSchema } from '@/lib/validations/product';
import {
  categoriesOptions,
  countryOptions,
  drynessOptions,
  regionOptions,
  sizesOptions,
  subRegionOptions,
  typeOptions,
  varientOptions,
} from '@/utils/productAddFormUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const ProductAdd = () => {
  const { data: metaData } = useGetMetaQuery(undefined, {
    pollingInterval: 40000,
    refetchOnMountOrArgChange: true,
  });

  const router = useRouter();

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
      regions: '',
      subRegions: '',
      categories: '',
      subCategories: '',
      dryness: '',
      size: '',
      type: [],
      image: '',
      greatForGift: false,
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
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-5">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold uppercase">Add Product</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
        {/* details */}
        <div className="w-full border-b border-primary mt-4"></div>
        <h2 className="text-md font-bold uppercase mt-4">Product Details</h2>
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
            {/* categories */}
            <Dropdown
              disabled={!metaData}
              label="Categories"
              options={categoriesOptions(metaData)}
              onSelect={(value) => {
                reset({
                  ...formValues,
                  categories: value,
                });
              }}
              buttonVariant="outline"
              error={errors.categories?.message}
              required
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
                });
              }}
              buttonVariant="outline"
              error={errors.country?.message}
              required
            />
            {/* region */}
            <Dropdown
              disabled={!formValues.country}
              label="Region"
              options={regionOptions(metaData, formValues.country)}
              onSelect={(value) => {
                reset({
                  ...formValues,
                  regions: value,
                });
              }}
              buttonVariant="outline"
              error={errors.regions?.message}
              required
            />
            {/* sub region */}
            <Dropdown
              disabled={!formValues.regions}
              label="Sub Region"
              options={subRegionOptions(
                metaData,
                formValues.country,
                formValues.regions
              )}
              onSelect={(value) => {
                reset({
                  ...formValues,
                  subRegions: value,
                });
              }}
              buttonVariant="outline"
              error={errors.subRegions?.message}
            />
            {/* dryness */}
            <Dropdown
              disabled={!metaData}
              label="Dryness"
              options={drynessOptions(metaData)}
              onSelect={(value) => {
                reset({
                  ...formValues,
                  dryness: value,
                });
              }}
              buttonVariant="outline"
              error={errors.dryness?.message}
              required
            />
            {/* sizes */}
            <Dropdown
              disabled={!metaData}
              label="Sizes"
              options={sizesOptions(metaData)}
              onSelect={(value) => {
                reset({
                  ...formValues,
                  size: value,
                });
              }}
              buttonVariant="outline"
              error={errors.size?.message}
              required
            />
            {/* varient */}
            <Dropdown
              disabled={
                !(varientOptions(metaData, formValues.categories)?.length > 0)
              }
              label="Varient"
              options={varientOptions(metaData, formValues.categories)}
              onSelect={(value) => {
                reset({
                  ...formValues,
                  subCategories: value,
                });
              }}
              buttonVariant="outline"
              error={errors.subCategories?.message}
            />
          </div>
          {/* right */}
          <div className="col-span-1 w-full space-y-2">
            {/* type */}
            <MultiselectForm
              label="Type"
              options={typeOptions(metaData)}
              onSelect={(value) => {
                reset({
                  ...formValues,
                  type: value.map((item) => item.value),
                });
              }}
              error={errors.type?.message}
            />
            {/* image */}
            <ImageUploadForm
              label="Product Image"
              subLabel="Main product photo"
              description="Upload a high-quality image of your product"
              required
              onImageChange={(file) => {
                if (file) {
                  reset({ ...formValues, image: file });
                }
              }}
              error={errors.image?.message}
            />
            {/* great for gift */}
            <CheckBoxForm
              label="Great for Gift"
              checked={formValues.greatForGift || false}
              onChange={(checked) => {
                reset({ ...formValues, greatForGift: checked });
              }}
              error={errors.greatForGift?.message}
            />
          </div>
        </div>

        {/* pricing */}
        <div className="w-full border-b border-primary mt-4"></div>
        <h2 className="text-md font-bold uppercase my-4">Product Pricing</h2>
        <div className="bg-background w-full h-auto p-2 space-y-2 space-x-2">
          <div className="w-full h-full">
            <h2 className="text-md font-bold uppercase">Resiving</h2>
          </div>
          <div className="w-full h-full flex flex-row gap-2">
            <InputForm
              label={'Case count'}
              placeholder={'Case count'}
              type={'number'}
              register={register('caseCount', { valueAsNumber: true })}
              error={errors.caseCount?.message}
              required
            />
            <InputForm
              label={'Product Name'}
              placeholder={'Name'}
              type={'text'}
              register={register('name')}
              error={errors.name?.message}
              required
            />
            <InputForm
              label={'Product Name'}
              placeholder={'Name'}
              type={'text'}
              register={register('name')}
              error={errors.name?.message}
              required
            />
            <InputForm
              label={'Product Name'}
              placeholder={'Name'}
              type={'text'}
              register={register('name')}
              error={errors.name?.message}
              required
            />
          </div>
          <div className="w-full h-full flex flex-row gap-2">
            <InputForm
              label={'Product Name'}
              placeholder={'Name'}
              type={'text'}
              register={register('name')}
              error={errors.name?.message}
              required
            />
            <InputForm
              label={'Product Name'}
              placeholder={'Name'}
              type={'text'}
              register={register('name')}
              error={errors.name?.message}
              required
            />
          </div>
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
