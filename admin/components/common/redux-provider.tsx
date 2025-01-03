'use client';

import { store } from '@/features/store/store';
import { Provider } from 'react-redux';

const ReduxProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
