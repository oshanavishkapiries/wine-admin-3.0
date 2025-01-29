import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { ChevronDown } from 'lucide-react';

type Option = {
  value: string;
  label: string;
};

interface DropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  isRequired?: boolean;
}

export function FormDropdown({
  options,
  value,
  onChange,
  label,
  isRequired = false,
}: DropdownProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>
        {label.replace('Select ', ' ')}{' '}
        {isRequired && <span className="text-destructive text-red-500">*</span>}
      </Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {value
              ? options.find((option) => option.value === value)?.label
              : label}
            <ChevronDown
              className="-me-1 ms-2 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="n-w-[--radix-dropdown-menu-trigger-width]">
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
