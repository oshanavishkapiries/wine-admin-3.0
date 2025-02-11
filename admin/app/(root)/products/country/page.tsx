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
import {
  useCountryCreateMutation,
  useRegionCreateMutation,
  useSubRegionCreateMutation,
} from '@/features/api/countrySlice';
import { toast } from 'sonner';
import Dropdown from '@/components/form/DropDownForm';
import { countryOptions, regionOptions } from '../[formType]/utils';

const CountryPage = () => {
  const { data: metaData } = useGetMetaQuery({});

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

  const [country, setCountry] = useState<string>('');
  const [region, setRegion] = useState<string>('');

  const [createCountry] = useCountryCreateMutation();
  const [regionCountry] = useRegionCreateMutation();
  const [subregion] = useSubRegionCreateMutation();

  console.log(
    'regionOptions(metaData, region)',
    regionOptions(metaData, country)
  );

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

  const onSubmitSection2 = async (data: any) => {
    await regionCountry({
      id: country || '',
      region: data.region,
    })
      .then(() => {
        toast.success(' region created successfully');
      })
      .catch(() => {
        toast.success(' Error creating region');
      });
  };

  const onSubmitSection3 = async (data: any) => {
    await subregion({
      countryId: country,
      regionId: region,
      subRegion: data.subregion,
    })
      .then(() => {
        toast.success(' region created successfully');
      })
      .catch(() => {
        toast.success(' Error creating region');
      });
  };

  return (
    <div className="container mx-auto p-10">
      <div className="w-full flex flex-row h-auto gap-4">
        <div className="w-full h-full">
          <div className="w-full flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold uppercase">Country Management</h1>
          </div>
          <div className="w-full h-full grid grid-cols-2">
            <RegionTree countries={metaData?.data?.country || []} />
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
                      options={countryOptions(metaData)}
                      defaultValue={country || ''}
                      onSelect={(value) => {
                        setCountry(value);
                      }}
                    />

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

                    <Dropdown
                      label={'Select Country'}
                      options={countryOptions(metaData)}
                      defaultValue={country || ''}
                      onSelect={(value) => {
                        setCountry(value);
                      }}
                    />

                    <Dropdown
                      label={'Select Region'}
                      options={regionOptions(metaData, country)}
                      disabled={!country}
                      defaultValue={region || ''}
                      onSelect={(value) => {
                        setRegion(value);
                      }}
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
