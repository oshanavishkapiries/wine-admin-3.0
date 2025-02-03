import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useId } from 'react';
import { Controller } from 'react-hook-form';
import { useUploadImageMutation } from '@/features/api/imageSlice';
import Image from 'next/image';

type FormImageUploadProps = {
  name: string;
  control: any;
  defaultImage?: string;
};

export default function FormImageUpload({
  name,
  control,
  defaultImage,
}: FormImageUploadProps) {
  const id = useId();
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [uploadImage] = useUploadImageMutation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (defaultImage) setPreview(defaultImage);
  }, [defaultImage]);

  const handleFileChange = async (
    file: File,
    onChange: (url: string) => void
  ) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsLoading(true);
      const response = await uploadImage(formData).unwrap();
      setPreview(response.imageUrl);
      onChange(response.imageUrl);
      setIsLoading(false);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.log(error);
      toast.error('Failed to upload image.');
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="space-y-2 w-full">
          <input
            id={id}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileChange(file, field.onChange);
            }}
            className="hidden"
          />
          <div className="relative w-full h-48 border rounded-lg overflow-hidden flex items-center justify-center bg-background">
            {preview ? (
              <Image
                src={preview}
                alt="Uploaded preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500">No image selected</span>
            )}
          </div>
          <Button asChild className="w-full">
            <label htmlFor={id} className="cursor-pointer">
              {isLoading ? 'Uploading...' : 'Upload Image'}
            </label>
          </Button>
        </div>
      )}
    />
  );
}
