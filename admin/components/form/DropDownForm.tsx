import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { IDropdownProps } from '@/types/form';
import { ChevronDown } from 'lucide-react';
import { useEffect, useId, useState } from 'react';

export default function Dropdown({
  label,
  options,
  onSelect,
  className,
  buttonVariant = 'outline',
  defaultValue,
  disabled,
  required,
  error,
}: IDropdownProps) {
  const id = useId();
  const [clickedLabel, setclickedLabel] = useState<string>();

  useEffect(() => {
    if (defaultValue) {
      const option = options?.find(opt => opt.value === defaultValue);
      if (option) {
        setclickedLabel(option.label);
      }
    }
  }, [defaultValue, options]);

  return (
    <div className={`${className} space-y-2`}>
     
      {label && (
        <Label htmlFor={id}>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={buttonVariant}
            className={className + ' w-full'}
            disabled={disabled}
          >
            {clickedLabel || 'Select an option'}
            <ChevronDown
              className="-me-1 ms-2 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[--radix-dropdown-menu-trigger-width]">
          {options?.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onSelect={() => {
                onSelect(option.value);
                setclickedLabel(option.label);
              }}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
