'use client';
import RegionTree from '@/components/sections/country/RegionTree';
import { useGetMetaQuery } from '@/features/api/metaSlice';

const CountryPage = () => {
  const { data: metaData } = useGetMetaQuery({});
  const regions = metaData?.data?.country || [];

  console.log(metaData);
  console.log(regions);

  return (
    <div className="container mx-auto p-10">
      <div className="w-full flex flex-row h-auto gap-4">
        <div className="w-full h-full">
          <div className="w-full flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold uppercase">Country Manegment</h1>
          </div>
          <div className="w-full h-full grid grid-cols-2">
            <RegionTree countries={regions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryPage;
