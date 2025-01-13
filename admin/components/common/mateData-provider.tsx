'use client';

import { useGetMetaQuery } from '@/features/api/metaSlice';
import React from 'react';

const MetaDataProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useGetMetaQuery(undefined, {
    pollingInterval: 40000,
    refetchOnMountOrArgChange: true,
  });
  return <>{children}</>;
};

export default MetaDataProvider;
