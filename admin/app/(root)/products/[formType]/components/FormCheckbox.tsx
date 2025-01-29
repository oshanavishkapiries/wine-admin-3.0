import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useId } from "react";
import { Controller } from "react-hook-form";

type FormCheckboxProps = {
  label: string;
  description?: string;
  name: string;
  control: any;
};

export default function FormCheckbox({
  label,
  description,
  name,
  control,
}: FormCheckboxProps) {
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
          <Checkbox
            id={id}
            className="order-1 after:absolute after:inset-0"
            checked={field.value}
            onCheckedChange={field.onChange}
            aria-describedby={`${id}-description`}
          />
          <div className="grid grow gap-2">
            <Label htmlFor={id}>
              {label}{" "}
              
            </Label>
            {description && (
              <p id={`${id}-description`} className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>
      )}
    />
  );
}
