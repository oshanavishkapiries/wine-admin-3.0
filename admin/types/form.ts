import { Option } from "@/components/ui/multiselect";

export interface InputFormProps {
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  register?: any;
  error?: string;
  className?: string;
  value?: string | number;
  description?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export interface IDropdownProps {
  label: string; 
  options: { value: string; label: string }[]; 
  onSelect: (value: string) => void; 
  className?: string;
  buttonVariant?: 'default' | 'outline' | 'destructive' | 'ghost'; 
  disabled?: boolean;
  required?: boolean;
  error?: string;
  defaultValue?: string;
}

export interface CheckBoxFormProps {
  label: string;
  subLabel?: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export interface ImageUploadFormProps {
  label: string;
  subLabel?: string;
  description?: string;
  required?: boolean;
  error?: string;
  imageUrl?: string;
  onImageChange: (imageUrl: string | null) => void;
  className?: string;
}

export interface IMultiselectFormProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: Option[];
  error?: string;
  disabled?: boolean;
  options?: Option[];
  onSelect?: (value: Option[]) => void;
}