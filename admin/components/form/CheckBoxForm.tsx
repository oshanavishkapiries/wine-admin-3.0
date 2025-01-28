'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CheckBoxFormProps } from '@/types/form';
import { useId, useState } from 'react';

export default function CheckBoxForm({
  label,
  subLabel,
  description,
  checked,
  onChange,
  error,
}: CheckBoxFormProps) {
  const id = useId();
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (value: boolean) => {
    setIsChecked(value);
    onChange(value);
  };

  return (
    <div className="relative bg-background flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
      <Checkbox
        id={id}
        checked={isChecked}
        onCheckedChange={handleChange}
        className="order-1 after:absolute after:inset-0 border-2 border-primary"
        aria-describedby={`${id}-description`}
      />
      <div className="grid grow gap-2">
        <Label htmlFor={id}>
          {label}{' '}
          {subLabel && (
            <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
              ({subLabel})
            </span>
          )}
        </Label>
        {description && (
          <p id={`${id}-description`} className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}
