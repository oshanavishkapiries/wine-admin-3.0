import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  label: string;
  error?: string;
  type?: string;
  isRequired?: boolean; 
} & UseFormRegisterReturn;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, type, error, isRequired = false, ...props }, ref) => {
    const id = useId();

    return (
      <div className="space-y-2">
        <Label htmlFor={id}>
          {label} {isRequired && <span className="text-destructive text-red-500">*</span>}
        </Label>
        <Input id={id} ref={ref} {...props} type={type} />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;