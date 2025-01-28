import React from 'react';
import CheckBoxForm from '@/components/form/CheckBoxForm';
import ImageUploadForm from '@/components/form/ImageUploadForm';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ProductFormValues } from '@/lib/validations/product-details';

interface CheckBoxAndImageProps {
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
  defaultValues?: Partial<ProductFormValues>;
}

const CheckBoxAndImage: React.FC<CheckBoxAndImageProps> = ({
  register,
  errors,
  defaultValues,
}) => {
  return (
    <div className="flex flex-col gap-4 my-3 border-t-2 border-gray-200 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Checkboxes */}
        <CheckBoxForm
          label="In Stock"
          checked={defaultValues?.inStock || false}
          onChange={(e) =>
            register('inStock').onChange({
              target: {
                value: e,
              },
            })
          }
          error={errors.inStock?.message}
        />
        <CheckBoxForm
          label="Is Active"
          checked={defaultValues?.isActive || false}
          onChange={(e) =>
            register('isActive').onChange({ target: { value: e } })
          }
          error={errors.isActive?.message}
        />
        <CheckBoxForm
          label="Great for Gift"
          checked={defaultValues?.greatForGift || false}
          onChange={(e) =>
            register('greatForGift').onChange({ target: { value: e } })
          }
          error={errors.greatForGift?.message}
        />

        {/* Image Upload */}
        <ImageUploadForm
          label="Product Image"
          imageUrl={defaultValues?.imageUrl}
          onImageChange={(imageUrl) =>
            register('imageUrl').onChange({ target: { value: imageUrl } })
          }
          error={errors.imageUrl?.message}
          className="col-span-full"
        />
      </div>
    </div>
  );
};

export default CheckBoxAndImage;
