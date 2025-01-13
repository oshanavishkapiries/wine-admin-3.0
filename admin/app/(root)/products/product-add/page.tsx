'use client';
import { useGetMetaQuery } from '@/features/api/metaSlice';

const ProductAdd = () => {
  const { data: metaData } = useGetMetaQuery(undefined, {
    pollingInterval: 40000,
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="w-full h-full p-3">
      <h1 className="text-2xl font-bold">title</h1>

      <form onSubmit={() => {}} className="w-full h-full">
        {/* section */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          {/* left */}
          <div className="col-span-1 w-full space-y-2"></div>
          {/* right */}
          <div className="col-span-1 w-full space-y-2"></div>
          {/* bottom */}
          <div className="col-span-1 w-full space-y-2"></div>
        </div>
      </form>
    </div>
  );
};

export default ProductAdd;
