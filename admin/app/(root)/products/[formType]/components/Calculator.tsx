import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from './FormInput';
import { useEffect } from 'react';

const Calculator = ({ onChange }: { onChange: (data: any) => void }) => {
  const cal = z.object({
    case_count: z.number().positive('Case count must be a positive number'),
    bottle_count_per_case: z
      .number()
      .positive('Bottle count per case must be a positive number'),
    per_case_buing_price: z
      .number()
      .positive('Per case buying price must be a positive number'),
    plus: z.number().positive('Plus must be a positive number').optional(),
    unit_cost: z.number().positive('Unit cost must be a positive number').optional(),
    qty: z.number().positive('Quantity must be a positive number').optional(),
    total_cost: z.number().positive('Total cost must be a positive number').optional(),
  });

  type Calculator = z.infer<typeof cal>;

  const {
    register,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm<Calculator>({
    resolver: zodResolver(cal),
    defaultValues: {
        case_count: 0,
        bottle_count_per_case: 0,
        per_case_buing_price: 0,
        plus: 0,
        unit_cost: 0,
        qty: 0,
        total_cost: 0,
      },
  });

  const caseCount = useWatch({ control, name: 'case_count' });
  const bottleCountPerCase = useWatch({ control, name: 'bottle_count_per_case' });
  const perCaseBuyingPrice = useWatch({ control, name: 'per_case_buing_price' });
  const plus = useWatch({ control, name: 'plus' });

  // Calculate Quantity (qty)
  useEffect(() => {
    if (caseCount !== undefined && bottleCountPerCase !== undefined) {
      const qty = caseCount * bottleCountPerCase + (plus || 0);
      setValue('qty', qty);
    }
  }, [caseCount, bottleCountPerCase, plus, setValue]);

  // Calculate Unit Cost
  useEffect(() => {
    if (
      perCaseBuyingPrice !== undefined &&
      bottleCountPerCase !== undefined &&
      bottleCountPerCase !== 0
    ) {
      const unitCost = perCaseBuyingPrice / bottleCountPerCase;
      setValue('unit_cost', unitCost);
    }
  }, [perCaseBuyingPrice, bottleCountPerCase, setValue]);

  // Calculate Total Cost
  const qty = watch('qty');
  const unitCost = watch('unit_cost');
  useEffect(() => {
    console.log("qty: ", qty, "unitCost: ", unitCost);

    onChange({ qty, unitCost });

    if (qty !== undefined && unitCost !== undefined) {
      const totalCost = qty * unitCost;
      setValue('total_cost', totalCost);
    }
  }, [qty, unitCost, setValue]);

  return (
    <div className="w-full p-4 bg-muted/50">
      <h1 className="text-xl font-bold uppercase mb-2">Calculator</h1>
      <div className="w-full grid grid-cols-4 gap-4">
        <FormInput
          label="Case Count"
          {...register('case_count', { valueAsNumber: true })}
          type='number'
          error={errors.case_count?.message}
        />
        <FormInput
          label="Bottle Count Per Case"
          {...register('bottle_count_per_case', { valueAsNumber: true })}
          type='number'
          error={errors.bottle_count_per_case?.message}
        />
        <FormInput
          label="Per Case Buying Price"
          {...register('per_case_buing_price', { valueAsNumber: true })}
          type='number'
          error={errors.per_case_buing_price?.message}
        />
        <FormInput
          label="Plus"
          {...register('plus', { valueAsNumber: true })}
          type='number'
          error={errors.plus?.message}
        />
        <FormInput
          label="Unit Cost"
          {...register('unit_cost', { valueAsNumber: true })}
          type='number'
          error={errors.unit_cost?.message}
        />
        <FormInput
          label="Quantity"
          {...register('qty', { valueAsNumber: true })}
          type='number'
          error={errors.qty?.message}
        />
        <FormInput
          label="Total Cost"
          {...register('total_cost', { valueAsNumber: true })}
          type='number'
          error={errors.total_cost?.message}
        />
      </div>
    </div>
  );
};

export default Calculator;