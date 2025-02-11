'use client';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useGetMetaQuery } from '@/features/api/metaSlice';
import RegionTree from '@/components/sections/country/RegionTree';

import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../[formType]/components/FormInput';
import { FormDropdown } from '../[formType]/components/FormDropdown';
import { useCountryCreateMutation } from '@/features/api/countrySlice';
import { toast } from 'sonner';
import Dropdown from '@/components/form/DropDownForm';

const CountryPage = () => {
  const { data: metaData } = useGetMetaQuery({});
  const regions = metaData?.data?.country || [];

  const countrySchema = z.object({
    country: z.string().optional(),
    region: z.string().optional(),
    subregion: z.string().optional(),
  });

  type CountryFormValues = z.infer<typeof countrySchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CountryFormValues>({
    resolver: zodResolver(countrySchema),
  });

  const [country, setCountry] = useState<string | undefined>();
  const [region, setRegion] = useState<string | undefined>();

  const [createCountry] = useCountryCreateMutation();

  const onSubmitSection1 = async (data: any) => {
    await createCountry({
      name: data.country,
    })
      .then(() => {
        toast.success(' Country created successfully');
      })
      .catch(() => {
        toast.success(' Error creating country');
      });
  };

  const onSubmitSection2 = (data: any) => {
    console.log('Section 2 submitted:', data);
  };

  const onSubmitSection3 = (data: any) => {
    console.log('Section 3 submitted:', data);
  };

  return (
    <div className="container mx-auto p-10">
      <div className="w-full flex flex-row h-auto gap-4">
        <div className="w-full h-full">
          <div className="w-full flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold uppercase">Country Management</h1>
          </div>
          <div className="w-full h-full grid grid-cols-2">
            <RegionTree countries={regions} />
            <div className="w-full h-full">
              <div>
                {/* Section 1 */}
                <form
                  onSubmit={handleSubmit(onSubmitSection1)}
                  className="space-y-4"
                >
                  <section>
                    <h2 className="font-semibold text-lg">
                      Section 1: Country
                    </h2>
                    <FormInput
                      label="Country"
                      {...register('country')}
                      error={errors.country?.message}
                    />
                    <Button type="submit" className="mt-4">
                      Submit Section 1
                    </Button>
                  </section>
                </form>

                {/* Section 2 */}
                <form
                  onSubmit={handleSubmit(onSubmitSection2)}
                  className="space-y-4 mt-8"
                >
                  <section>
                    <h2 className="font-semibold text-lg">
                      Section 2: Country & Region
                    </h2>
                    
                    <Dropdown
                      label={'Select Country'}
                      options={regions.map((r: any) => ({
                        label: r.name,
                        value: r.code,
                      }))}
                      defaultValue={country || ''}
                      onSelect={(value) => {
                        console.log('value', value);
                        setCountry(value);
                        setValue('country', value);
                      }}
                    />
                    
                    {/* <FormDropdown
                      label="Select Country"
                      options={regions.map((r: any) => ({
                        label: r.name,
                        value: r.code,
                      }))}
                      value={country || ''}
                      onChange={(value) => {
                        console.log('value', value);
                        setCountry(value);
                        setValue('country', value);
                      }}
                      isRequired
                    /> */}
                    <FormInput
                      label="Region"
                      {...register('region')}
                      error={errors.region?.message}
                    />
                    <Button type="submit" className="mt-4">
                      Submit Section 2
                    </Button>
                  </section>
                </form>

                {/* Section 3 */}
                <form
                  onSubmit={handleSubmit(onSubmitSection3)}
                  className="space-y-4 mt-8"
                >
                  <section>
                    <h2 className="font-semibold text-lg">
                      Section 3: Country, Region & Subregion
                    </h2>
                    <FormDropdown
                      label="Select Country"
                      options={regions.map((r: any) => ({
                        label: r.name,
                        value: r.code,
                      }))}
                      value={country || ''}
                      onChange={(value) => {
                        setCountry(value);
                        setValue('country', value);
                      }}
                      isRequired
                    />
                    <FormDropdown
                      label="Select Region"
                      options={
                        country
                          ? regions
                              .find((r: any) => r.code === country)
                              ?.regions.map((r: any) => ({
                                label: r.name,
                                value: r.code,
                              })) || []
                          : []
                      }
                      value={region || ''}
                      onChange={(value) => {
                        setRegion(value);
                        setValue('region', value);
                      }}
                      isRequired
                    />
                    <FormInput
                      label="Subregion"
                      {...register('subregion')}
                      error={errors.subregion?.message}
                    />
                    <Button type="submit" className="mt-4">
                      Submit Section 3
                    </Button>
                  </section>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryPage;
