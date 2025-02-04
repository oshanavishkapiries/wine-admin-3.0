import { BaggageClaim, Box, LayoutDashboard, Percent, ListFilter, CircleDollarSign, MapPin, Settings } from 'lucide-react';

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
    subItems: [],
  },
  {
    title: 'Products',
    url: '/products',
    icon: Box,
    subItems: [
      {
        title: 'Discount',
        url: '/products/discount',
        icon: Percent,
      },
      {
        title: 'Category',
        url: '/products/category',
        icon: ListFilter,
      },
      {
        title: 'Profit Margin',
        url: '/products/profit-margin',
        icon: CircleDollarSign,
      },
      {
        title: 'Country',
        url: '/products/country',
        icon: MapPin,
      }
    ],
  },
  {
    title: 'Orders',
    url: '/orders',
    icon: BaggageClaim,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];
