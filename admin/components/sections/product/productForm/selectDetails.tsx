import React from 'react';
import Dropdown from '@/components/form/DropDownForm';
import MultiselectForm from '@/components/form/MultiselectForm';
import { Option } from '@/components/ui/multiselect';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProductFormValues } from '@/lib/validations/product-details';

interface SelectDetailsProps {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  defaultValues?: Partial<ProductFormValues>;
}

const SelectDetails: React.FC<SelectDetailsProps> = ({ register, errors, defaultValues }) => {
  // Dropdown options
  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
  ];

  const regionOptions = [
    { value: 'north', label: 'North' },
    { value: 'south', label: 'South' },
    { value: 'east', label: 'East' },
    { value: 'west', label: 'West' },
  ];

  const subRegionOptions = [
    { value: 'northeast', label: 'Northeast' },
    { value: 'northwest', label: 'Northwest' },
    { value: 'southeast', label: 'Southeast' },
    { value: 'southwest', label: 'Southwest' },
  ];

  const categoryOptions = [
    { value: 'wine', label: 'Wine' },
    { value: 'beer', label: 'Beer' },
    { value: 'spirits', label: 'Spirits' },
  ];

  const varietalOptions = [
    { value: 'cabernet', label: 'Cabernet Sauvignon' },
    { value: 'merlot', label: 'Merlot' },
    { value: 'chardonnay', label: 'Chardonnay' },
  ];

  const drynessOptions = [
    { value: 'dry', label: 'Dry' },
    { value: 'semi-dry', label: 'Semi-Dry' },
    { value: 'sweet', label: 'Sweet' },
  ];

  const sizeOptions = [
    { value: '750ml', label: '750ml' },
    { value: '1L', label: '1L' },
    { value: '1.5L', label: '1.5L' },
  ];

  // Multiselect options
  const typeOptions: Option[] = [
    { value: 'red', label: 'Red' },
    { value: 'white', label: 'White' },
    { value: 'rose', label: 'Rosé' },
    { value: 'sparkling', label: 'Sparkling' },
  ];

  return (
    <div className="flex flex-col gap-4 my-3 border-t-2 border-gray-200 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Dropdowns */}
        <Dropdown
          label="Country"
          options={countryOptions}
          onSelect={(value) => register('country').onChange({ target: { value } })}
          defaultValue={defaultValues?.country}
          error={errors.country?.message}
        />
        <Dropdown
          label="Region"
          options={regionOptions}
          onSelect={(value) => register('region').onChange({ target: { value } })}
          defaultValue={defaultValues?.region}
          error={errors.region?.message}
        />
        <Dropdown
          label="Sub Region"
          options={subRegionOptions}
          onSelect={(value) => register('subRegion').onChange({ target: { value } })}
          defaultValue={defaultValues?.subRegion}
          error={errors.subRegion?.message}
        />
        <Dropdown
          label="Category"
          options={categoryOptions}
          onSelect={(value) => register('category').onChange({ target: { value } })}
          defaultValue={defaultValues?.category}
          error={errors.category?.message}
        />
        <Dropdown
          label="Varietal"
          options={varietalOptions}
          onSelect={(value) => register('varietal').onChange({ target: { value } })}
          defaultValue={defaultValues?.varietal}
          error={errors.varietal?.message}
        />
        <Dropdown
          label="Dryness"
          options={drynessOptions}
          onSelect={(value) => register('dryness').onChange({ target: { value } })}
          defaultValue={defaultValues?.dryness}
          error={errors.dryness?.message}
        />
        <Dropdown
          label="Size"
          options={sizeOptions}
          onSelect={(value) => register('size').onChange({ target: { value } })}
          defaultValue={defaultValues?.size}
          error={errors.size?.message}
        />

        {/* Multiselect */}
        <MultiselectForm
          label="Type"
          options={typeOptions}
          onSelect={(selectedOptions) =>
            register('type').onChange({ target: { value: selectedOptions.map((opt) => opt.value) } })
          }
          defaultValue={defaultValues?.type?.map((value) => ({
            value,
            label: typeOptions.find((opt) => opt.value === value)?.label || value,
          }))}
          error={errors.type?.message}
        />
      </div>
    </div>
  );
};

export default SelectDetails;