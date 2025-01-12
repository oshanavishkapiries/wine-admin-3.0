'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useId } from 'react';

interface InputFormProps {
  required?: boolean;
  className?: string;
  title: string;
  placeholder: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  disabled?: boolean;
  disabledMessage?: string;
  error?: boolean;
  errorMessage?: string;
}

export default function InputForm({
  className,
  title,
  placeholder,
  type = 'text',
  onChange,
  defaultValue,
  required = false,
  disabled = false,
  disabledMessage = 'This field is disabled',
  error = false,
  errorMessage = 'This field is required',
}: InputFormProps) {
  const id = useId();

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id}>
        {title} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        disabled={disabled}
        defaultValue={defaultValue}
        className={error ? 'border-red-500' : ''}
      />
      {disabled && <p className="text-sm text-gray-500">{disabledMessage}</p>}
      {error && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}
