'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import * as z from 'zod';
import { useState } from 'react';
import { useUpdateCategoryMarginMutation } from '@/features/api/categorySlice';
import { toast } from 'sonner';
import InputForm from '@/components/form/InputForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useGetMetaQuery } from '@/features/api/metaSlice';

const formSchema = z.object({
  margin: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    },
    {
      message: 'Margin must be a number between 0 and 100',
    }
  ),
});

type FormData = z.infer<typeof formSchema>;

interface EditProfitPopupProps {
  children: React.ReactNode;
  initialData: {
    id: string;
    margin: string;
    name: string;
  };
}

export function EditProfitPopup({
  children,
  initialData,
}: EditProfitPopupProps) {
  const [open, setOpen] = useState(false);
  const [updateMargin] = useUpdateCategoryMarginMutation();
  const { refetch } = useGetMetaQuery({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      margin: initialData.margin,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateMargin({
        id: initialData.id,
        margin: parseFloat(data.margin),
      }).unwrap();
      refetch();
      toast.success('Margin updated successfully');
      setOpen(false);
      reset();
    } catch (error) {
      toast.error('Failed to update margin');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profit Margin for {initialData.name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputForm
            label="Profit Margin (%)"
            placeholder="Enter profit margin"
            required
            register={register('margin')}
            error={errors.margin?.message}
            type="number"
          />

          <Button type="submit" className="w-full">
            Update Margin
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
