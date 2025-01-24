'use client';

import React from 'react';
import { useParams } from 'next/navigation';

const ProductAddAndUpdate = () => {
  const params = useParams();
  const formType = params.formType as string;

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-xl font-bold uppercase flex items-center gap-2">
        {formType === 'product-add' ? 'Product Add' : 'Product Edit'}
      </h1>

      
    </div>
  );
};

export default ProductAddAndUpdate;
