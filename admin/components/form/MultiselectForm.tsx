import { Label } from '@/components/ui/label';
import MultipleSelector, { Option } from '@/components/ui/multiselect';
import {  useId } from 'react';

interface IMultiselectFormProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: Option[];
  error?: string;
  disabled?: boolean;
  options?: Option[];
  onSelect?: (value: Option[]) => void;
}
export default function MultiselectForm({
  label,
  defaultValue,
  required,
  placeholder,
  error,
  disabled,
  options,
  onSelect,
}: IMultiselectFormProps) {
  const id = useId();

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <MultipleSelector
        key={JSON.stringify(options)}
        disabled={disabled}
        commandProps={{
          label: 'Select Options',
        }}
        value={defaultValue}
        defaultOptions={options}
        placeholder={placeholder || 'Select Options'}
        hideClearAllButton
        hidePlaceholderWhenSelected
        emptyIndicator={<p className="text-center text-sm">No results found</p>}
        onChange={onSelect}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
