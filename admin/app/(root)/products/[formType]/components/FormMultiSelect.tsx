import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { Controller } from "react-hook-form";

type FormMultiSelectProps = {
  label: string;
  name: string;
  control: any;
  options: Option[];
  defaultValues?: string[];
};

export default function FormMultiSelect({
  label,
  name,
  control,
  options,
  defaultValues = [],
}: FormMultiSelectProps) {

  
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValues}
      render={({ field }) => (
        <div>
          <Label>{label}</Label>
          <MultipleSelector
            commandProps={{
              label: "Select options",
            }}
            value={options.filter((option) => field.value.includes(option.value))}
            defaultOptions={options}
            placeholder="Select options"
            hideClearAllButton
            hidePlaceholderWhenSelected
            emptyIndicator={<p className="text-center text-sm">No results found</p>}
            onChange={(selected) => field.onChange(selected.map((s) => s.value))}
          />
        </div>
      )}
    />
  );
}
