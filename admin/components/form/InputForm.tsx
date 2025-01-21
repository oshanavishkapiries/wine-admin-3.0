import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { InputFormProps } from '@/types/form';
import { useId } from 'react';

export default function InputForm({
  label,
  placeholder,
  type = 'text',
  required = false,
  register,
  error,
  value,
  onChange,
  description,
}: InputFormProps) {
  const id = useId();
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Input
        {...register}
        id={id}
        placeholder={placeholder}
        type={type}
        className={cn(error && 'border-destructive')}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
}
