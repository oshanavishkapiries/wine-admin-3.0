import { BaggageClaim, Box, LayoutDashboard } from 'lucide-react';

type SiderNavigationItem = {
  title: string;
  url: string;
  isActive?: boolean,
  icon?: React.ComponentType;
  subItems?: SiderNavigationItem[];
};

export const siderNavigation: SiderNavigationItem[] = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: 'Products',
    url: '/products',
    icon: Box,
    subItems: [
      {
        title: 'Discount Management',
        url: '/products/discount',
      },
      {
        title: 'Category Management',
        url: '/products/category',
      },
    ],
  },
  {
    title: 'Orders',
    url: '/orders',
    icon: BaggageClaim,
  },
];
