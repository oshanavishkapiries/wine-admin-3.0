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