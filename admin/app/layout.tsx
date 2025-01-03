import type { Metadata } from 'next';
import './globals.css';
import ReduxProvider from '@/components/common/redux-provider';
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: 'GOTHEM WINE ADMIN',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
