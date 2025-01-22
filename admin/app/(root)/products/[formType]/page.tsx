'use client';
import CheckBoxForm from '@/components/form/CheckBoxForm';
import Dropdown from '@/components/form/DropDownForm';
import ImageUploadForm from '@/components/form/ImageUploadForm';
import InputForm from '@/components/form/InputForm';
import MultiselectForm from '@/components/form/MultiselectForm';
import { Button } from '@/components/ui/button';
import { useGetMetaQuery } from '@/features/api/metaSlice';
import { useProductCreateMutation } from '@/features/api/productSlice';
import { useProductAddPriceCalculator } from '@/hooks/product-add-price-calculator';
import { ProductFormValues, productSchema } from '@/lib/validations/product';
import {
  categoriesOptions,
  categoryProfitMargin,
  countryOptions,
  drynessOptions,
  regionOptions,
  sizesOptions,
  subRegionOptions,
  typeOptions,
  varientOptions,
} from '@/utils/productAddFormUtils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeftIcon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const ProductAdd = ({ params }: { params: { formType: string } }) => {
  const { formType } = params;
  console.log('id: ', formType?.split('-')[1]);
  const { data: metaData } = useGetMetaQuery(undefined, {
    pollingInterval: 40000,
    refetchOnMountOrArgChange: true,
  });
  const [createProduct] = useProductCreateMutation();
  const router = useRouter();
  const {
    caseCount,
    setCaseCount,
    bottleCountPerCase,
    setBottleCountPerCase,
    perCaseBuyingCost,
    setPerCaseBuyingCost,
    plus,
    setPlus,
    perBottleCost,
    totalCost,
    setPerBottleCost,
    setTotalCost,
    qty,
    setQty,
  } = useProductAddPriceCalculator();

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
      abv: '',
      rating: '',
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
      qtyOnHand: 0,
      unitPrice: 0,
      unitCost: 0,
      isPack: false,
      pack: [],
      inStock: false,
      isActive: true,
    },
  });

  const formValues = watch();
  const [profitMargin, setProfitMargin] = useState('');
  const [retailPrice, setRetailPrice] = useState('');
  useEffect(() => {
    if (perBottleCost) {
      reset({
        ...formValues,
        unitCost: Number(perBottleCost),
      });
    }
    if (formValues.categories) {
      setProfitMargin(categoryProfitMargin(formValues.categories, metaData));
    }
    if (formValues.unitCost) {
      setRetailPrice(
        String(formValues.unitCost * (1 + Number(profitMargin || 0) / 100))
      );
    }
  }, [formValues.categories, formValues.unitCost, perBottleCost]);

  useEffect(() => {
    if (qty) {
      reset({
        ...formValues,
        qtyOnHand: Number(qty),
      });
    }
  }, [qty]);

  useEffect(() => {
    if (retailPrice) {
      reset({
        ...formValues,
        unitPrice: Number(retailPrice),
      });
    }
  }, [retailPrice]);

  console.log('formValues', formValues);
  const onSubmit = async (data: any) => {
    try {
      const res = await createProduct(data);
      if (res.data) {
        toast.success('Product created successfully');
      }
      console.log(res);
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  };

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
          </div>
          {/* right */}
          <div className="col-span-1 w-full space-y-2">
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

        <div className="w-full border-b opacity-50 border-primary mt-4"></div>
        <div className="grid grid-cols-3 gap-2 mt-3">
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
            label={'Product ABV (%)'}
            placeholder={'ABV'}
            type={'number'}
            register={register('abv')}
            error={errors.abv?.message}
            required
          />

          {/* product rating */}
          <InputForm
            label={'Product Rating (0-5)'}
            placeholder={'Rating'}
            type={'number'}
            register={register('rating')}
            error={errors.rating?.message}
          />

          {/* product vintage */}
          <InputForm
            label={'Product Vintage (Year)'}
            placeholder={'Vintage'}
            type={'number'}
            register={register('vintage')}
            error={errors.vintage?.message}
          />
        </div>

        {/* pricing */}
        <div className="w-full border-b border-primary mt-4"></div>
        <h2 className="text-md font-bold uppercase my-4">Product Pricing</h2>
        {/* receiving */}
        <div className="bg-background w-full h-auto p-2 space-y-2 shadow">
          <div className="w-full h-full">
            <h2 className="text-md font-bold uppercase">Resiving</h2>
          </div>
          <div className="w-full h-full grid grid-cols-4 gap-2">
            <InputForm
              label={'Case count'}
              placeholder={'Case count'}
              type={'number'}
              value={caseCount.toString()}
              onChange={(e) => setCaseCount(e.target.value)}
            />
            <InputForm
              label={'Bottle count per case'}
              placeholder={'Bottle count per case'}
              type={'number'}
              value={bottleCountPerCase}
              onChange={(e) => setBottleCountPerCase(e.target.value)}
            />
            <InputForm
              label={'Per case buying cost'}
              placeholder={'Per case buying cost'}
              type={'number'}
              value={perCaseBuyingCost}
              onChange={(e) => setPerCaseBuyingCost(e.target.value)}
            />
            <InputForm
              label={'Plus'}
              placeholder={'Plus'}
              type={'number'}
              value={plus}
              onChange={(e) => setPlus(e.target.value)}
            />
          </div>
          <div className="w-full h-full grid grid-cols-4 gap-2">
            <InputForm
              label={'Per bottler cost'}
              placeholder={'Per bottler cost'}
              type={'number'}
              value={perBottleCost}
              onChange={(e) => setPerBottleCost(e.target.value)}
            />
            <InputForm
              label={'Total cost'}
              placeholder={'Total cost'}
              type={'number'}
              value={totalCost}
              onChange={(e) => setTotalCost(e.target.value)}
            />
          </div>
        </div>
        {/* qty on hand */}
        <div className="w-full grid grid-cols-3 gap-2 mt-4">
          <InputForm
            label={'Qty on hand'}
            placeholder={'Qty on hand'}
            type={'number'}
            value={qty}
            onChange={(e) => {
              setQty(e.target.value);
            }}
          />
          <InputForm
            label={'Profit margin (%)'}
            placeholder={'Profit margin'}
            value={profitMargin}
            onChange={(e) => setProfitMargin(e.target.value)}
            type={'number'}
          />
          <InputForm
            label={'Retail price (USD)'}
            placeholder={'Retail price'}
            type={'number'}
            value={retailPrice}
            onChange={(e) => setRetailPrice(e.target.value)}
          />
        </div>
        {/* summary */}
        <div className="w-full mt-4 p-2 bg-white shadow">
          <h3 className="text-md font-semibold mb-3 uppercase">
            Price Summary
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Unit Cost:</span>
                <span className="font-medium">
                  ${formValues.unitCost?.toFixed(2) || '0.00'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Profit Margin:</span>
                <span className="font-medium">
                  {Number(profitMargin).toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Buying Price:</span>
                <span className="font-medium">
                  $ {Number(retailPrice).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* product pack */}
        <div className="w-full border-b border-primary mt-4"></div>
        <h2 className="text-md font-bold uppercase my-4">Product Pack</h2>
        <div className="w-full h-full">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPack"
                {...register('isPack')}
                className="w-4 h-4 rounded border-gray-300"
              />
              <label htmlFor="isPack" className="text-sm font-medium">
                Enable Pack
              </label>
            </div>

            {formValues.isPack && (
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2"
              >
                <PlusIcon className="w-4 h-4" />
                Add Pack Item
              </Button>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="px-4 mt-2 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
