export interface CategoryDiscountProps {
    children: React.ReactNode;
    mode?: 'add' | 'edit';
    title?: string;
    description?: string;
    defaultValues?: {
      id?: string;
      discountName?: string;
      categoryId?: { name: string; _id: string }[];
      unitDiscount?: number;
      packDiscount?: number;
      startDate?: string;
      endDate?: string;
    };
  }

  export interface PromoCodeProps {
    children: React.ReactNode;
    mode?: 'add' | 'edit';
    title?: string;
    description?: string;
    defaultValues?: {
      id?: string;
      discountName?: string;
      code?: string;
      unitDiscount?: number;
      packDiscount?: number;
      startDate?: string;
      endDate?: string;
    };
  }


  export interface ProductFormProps {
    children: React.ReactNode;
    mode?: 'add' | 'edit';
    title?: string;
    description?: string;
    defaultValues?:  {
      id?: string;
      discountName?: string;
      productId?: { name: string; _id: string }[];
      unitDiscount?: number;
      packDiscount?: number;
      startDate?: string;
      endDate?: string;
    };
  }
  


  export type Discount = {
    _id: string;
    discountName: string;
    startDate: string;
    endDate: string;
    discountType: string;
    unitDiscount: number;
    packDiscount: number;
    details: string;
    isActive: boolean;
    code: string;
    categoryId: { name: string; _id: string }[];
    productId:{ name: string; _id: string }[];
  };
  