'use client';

import { Label } from '@/components/ui/label';
import { useId } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useUploadImageMutation } from '@/features/api/imageSlice';
import { toast } from 'sonner';
import { ImageUploadFormProps } from '@/types/form';

export default function ImageUploadForm({
  label,
  subLabel,
  description,
  required,
  error,
  imageUrl,
  onImageChange,
  className,
}: ImageUploadFormProps) {
  const id = useId();
  const [imageData, setImageData] = useState<string | null>(imageUrl || null);
  const [uploadImage] = useUploadImageMutation();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      try {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        const result = await uploadImage(formData).unwrap();
        onImageChange(result.imageUrl);
        toast.success('Image uploaded successfully');
      } catch (error) {
        console.error('Upload error:', error);
        toast.error('Failed to upload image');
        setPreviewUrl(null);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemoveImage = () => {
    onImageChange(null);
    setPreviewUrl(null);
    setImageData(null);
  };

  const displayUrl = imageData || previewUrl;

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
        {subLabel && (
          <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
            ({subLabel})
          </span>
        )}
      </Label>

      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      <div className="relative flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-300 p-6 transition-all hover:border-gray-400">
        {displayUrl ? (
          <div className="relative aspect-square w-full max-w-[200px]">
            <Image
              src={displayUrl}
              alt="Preview"
              width={200}
                            height={200}
              fill
              className="rounded-lg object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -right-2 -top-2"
              onClick={handleRemoveImage}
              disabled={isUploading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <ImagePlus className="h-8 w-8 text-gray-400" />
            <div className="text-center">
              <Button
                type="button"
                variant="outline"
                asChild
                className="relative"
                disabled={isUploading}
              >
                <label>
                  {isUploading ? 'Uploading...' : 'Choose Image'}
                  <input
                    id={id}
                    type="file"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={handleImageChange}
                    accept="image/*"
                    disabled={isUploading}
                  />
                </label>
              </Button>
              <p className="mt-2 text-xs text-gray-500">
                PNG, JPG, WEBP up to 5MB
              </p>
            </div>
          </>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
