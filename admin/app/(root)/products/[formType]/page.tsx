'use client';
import { useParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductFormValues, WineSchema } from './validation';
import FormInput from './components/FormInput';
import { defaultProductValues } from './defaultValues';
import {
  useGetAProductQuery,
  useProductCreateMutation,
  useUpdateProductMutation,
} from '@/features/api/productSlice';
import transformWineData from './transformWineData';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGetMetaQuery } from '@/features/api/metaSlice';
import {
  categoriesOptions,
  countryOptions,
  drynessOptions,
  regionOptions,
  sizesOptions,
  subRegionOptions,
  typeOptions,
  varientOptions,
} from '@/app/(root)/products/[formType]/utils';
import { FormDropdown } from './components/FormDropdown';
import { Separator } from '@/components/ui/separator';
import FormCheckbox from './components/FormCheckbox';
import FormImageUpload from './components/FormImageUpload';
import { Button } from '@/components/ui/button';
import FormMultiSelect from './components/FormMultiSelect';
import { toast } from 'sonner';

const AddUpdatePage = () => {
  const params = useParams();
  const router = useRouter();
  const formType = params?.formType as string;
  const mode = 'product' === formType?.split('-')[0] ? 'add' : 'edit';
  const id = formType?.split('-')[1];
  const { data: product, isLoading } = useGetAProductQuery(id);
  const { data: metaData, isLoading: metaloding } = useGetMetaQuery({});
  const [createProduct, { isLoading: isCreating }] = useProductCreateMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(WineSchema),
    defaultValues: defaultProductValues,
  });

  useEffect(() => {
    if (product) {
      reset(transformWineData(product?.data));
    }
  }, [product]);

  const onSubmit = (data: any) => {
    if (mode === 'add') {
      createProduct(data)
        .unwrap()
        .then((res: any) => {
          if (res.success) {
            toast.success('Product added successfully');
            router.push('/products');
          } else {
            toast.error(res.message);
          }
        });
    } else {
      updateProduct({ id, formData: data })
        .unwrap()
        .then((res: any) => {
          if (res.success) {
            toast.success('Product updated successfully');
            router.push('/products');
          } else {
            toast.error(res.message);
          }
        });
    }
    console.log('data', data);
  };

  // console.log('watch', watch());
  // console.log('product', product?.data);
  // console.log('countryOptions', countryOptions(metaData));
  // console.log('typeOptions', typeOptions(metaData));

  // if (product) {
  //   console.log('transformWineData', transformWineData(product?.data));
  // }

  return (
    <div className="w-full p-3">
      <h1 className="text-xl font-bold uppercase flex items-center gap-2">
        {formType === 'product-add' ? 'Product Add' : 'Product Edit'}
        {metaloding && isLoading && (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
        {/* details */}
        <div className="grid grid-cols-3 gap-4 mt-3">
          <FormInput
            label="Product Name"
            {...register('name')}
            error={errors.name?.message}
            isRequired={true}
          />
          <FormInput
            label="Description"
            {...register('description')}
            error={errors.description?.message}
          />
          <FormInput
            label="Vintage"
            {...register('vintage')}
            error={errors.vintage?.message}
            isRequired={true}
          />
          <FormInput
            label="ABV"
            {...register('abv', { valueAsNumber: true })}
            error={errors.abv?.message}
          />
          <FormInput
            label="Rating"
            {...register('rating', { valueAsNumber: true })}
            error={errors.rating?.message}
          />
        </div>

        <Separator />

        {/* selection */}
        <div className="grid grid-cols-3 gap-4 mt-3">
          <div>
            <Controller
              name="country"
              control={control}
              rules={{ required: 'country is required' }}
              render={({ field }) => (
                <FormDropdown
                  options={countryOptions(metaData) || []}
                  value={field.value}
                  onChange={field.onChange}
                  label="Select Country"
                  isRequired
                />
              )}
            />
            {errors.country && (
              <p className="text-red-500">{errors.country.message}</p>
            )}
          </div>

          <div>
            <Controller
              name="regions"
              control={control}
              rules={{ required: 'regions is required' }}
              render={({ field }) => (
                <FormDropdown
                  options={regionOptions(metaData, watch().country) || []}
                  value={field.value}
                  onChange={field.onChange}
                  label="Select Regions"
                  isRequired
                />
              )}
            />
            {errors.regions && (
              <p className="text-red-500">{errors.regions.message}</p>
            )}
          </div>

          <div>
            <Controller
              name="subRegions"
              control={control}
              rules={{ required: 'subRegions is required' }}
              render={({ field }) => (
                <FormDropdown
                  options={
                    subRegionOptions(
                      metaData,
                      watch().country,
                      watch().regions
                    ) || []
                  }
                  value={field.value}
                  onChange={field.onChange}
                  label="Select subRegions"
                  isRequired
                />
              )}
            />
            {errors.subRegions && (
              <p className="text-red-500">{errors.subRegions.message}</p>
            )}
          </div>

          <div>
            <Controller
              name="categories"
              control={control}
              rules={{ required: 'Category is required' }}
              render={({ field }) => (
                <FormDropdown
                  options={categoriesOptions(metaData) || []}
                  value={field.value}
                  onChange={field.onChange}
                  label="Select Category"
                  isRequired
                />
              )}
            />
            {errors.categories && (
              <p className="text-red-500">{errors.categories.message}</p>
            )}
          </div>

          <div>
            <Controller
              name="subCategories"
              control={control}
              rules={{ required: 'subCategories is required' }}
              render={({ field }) => (
                <FormDropdown
                  options={varientOptions(metaData, watch().categories) || []}
                  value={field.value}
                  onChange={field.onChange}
                  label="Select subCategories"
                  isRequired
                />
              )}
            />
            {errors.subCategories && (
              <p className="text-red-500">{errors.subCategories.message}</p>
            )}
          </div>

          <div>
            <Controller
              name="dryness"
              control={control}
              rules={{ required: 'dryness is required' }}
              render={({ field }) => (
                <FormDropdown
                  options={drynessOptions(metaData) || []}
                  value={field.value}
                  onChange={field.onChange}
                  label="Select dryness"
                  isRequired
                />
              )}
            />
            {errors.dryness && (
              <p className="text-red-500">{errors.dryness.message}</p>
            )}
          </div>

          <div>
            <Controller
              name="size"
              control={control}
              rules={{ required: 'size is required' }}
              render={({ field }) => (
                <FormDropdown
                  options={sizesOptions(metaData) || []}
                  value={field.value}
                  onChange={field.onChange}
                  label="Select size"
                  isRequired
                />
              )}
            />
            {errors.size && (
              <p className="text-red-500">{errors.size.message}</p>
            )}
          </div>

          {metaData && (
            <FormMultiSelect
              label="Select Types"
              name="type"
              control={control}
              options={typeOptions(metaData) || []}
              defaultValues={watch().type}
            />
          )}
        </div>

        <Separator />

        {/* calculator */}
        <div className="grid grid-cols-3 gap-4 mt-3">
          <FormInput
            label="Product QTY"
            {...register('qtyOnHand', { valueAsNumber: true })}
            error={errors.qtyOnHand?.message}
            isRequired={true}
          />
          <FormInput
            label="Product UnitCost"
            {...register('unitCost', { valueAsNumber: true })}
            error={errors.unitCost?.message}
            isRequired={true}
          />
          <FormInput
            label="Product RetailPrice"
            {...register('unitPrice', { valueAsNumber: true })}
            error={errors.unitPrice?.message}
            isRequired={true}
          />
        </div>

        <Separator />

        {/* clickbox & image */}
        <div className="grid grid-cols-3 gap-4 mt-3">
          <FormImageUpload
            name="image"
            control={control}
            defaultImage={watch().image || ''}
          />
          <div className="flex flex-col gap-4">
            <FormCheckbox
              label="In Stock"
              description="In Stock Product"
              name="inStock"
              control={control}
            />
            <FormCheckbox
              label="Is Active"
              description="Active Product"
              name="isActive"
              control={control}
            />
            <FormCheckbox
              label="Great for Gift"
              description="Great for Gifting Product"
              name="greatForGift"
              control={control}
            />
          </div>
          <div className="flex flex-col gap-4 justify-center items-center">
            <Button
              type="submit"
              className="btn btn-primary w-[200px] rounded-full gap-2"
            >
              {formType === 'product-add' ? 'Add Product' : 'Update Product'}
              {isCreating ||
                (isUpdating && <Loader2 className="h-4 w-4 animate-spin" />)}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUpdatePage;
