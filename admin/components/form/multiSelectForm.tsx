"use client"
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { useId } from "react";

interface MultiSelectFormProps {
  className?: string;
  title?: string; 
  placeholder?: string; 
  defaultOptions?: Option[]; 
  defaultValue?: Option[];
  onChange?: (selectedOptions: Option[]) => void; 
  hideClearAllButton?: boolean; 
  hidePlaceholderWhenSelected?: boolean; 
  emptyIndicator?: React.ReactNode; 
  disabled?: boolean; 
  required?: boolean;
}

export default function MultiSelectForm({
  className,
  title = "Multiselect",
  placeholder = "Select options", 
  defaultOptions = [], 
  defaultValue = [], 
  onChange,
  hideClearAllButton = false,
  hidePlaceholderWhenSelected = false,
  emptyIndicator = <p className="text-center text-sm">No results found</p>,
  disabled = false,
  required = false,
}: MultiSelectFormProps) {
  const id = useId();

  return (
    <div className={`space-y-2 ${className}`}>
      {title && <Label>{title} {required && <span className="text-red-500">*</span>}</Label> }
      <MultipleSelector
        commandProps={{
          label: placeholder,
        }}
        value={defaultValue}
        defaultOptions={defaultOptions}
        placeholder={placeholder}
        hideClearAllButton={hideClearAllButton}
        hidePlaceholderWhenSelected={hidePlaceholderWhenSelected}
        emptyIndicator={emptyIndicator}
        disabled={disabled}
        onChange={onChange}
      />
      {required && (
        <p className="mt-2 text-xs text-muted-foreground" role="region" aria-live="polite">
          This field is required.
        </p>
      )}
    </div>
  );
}