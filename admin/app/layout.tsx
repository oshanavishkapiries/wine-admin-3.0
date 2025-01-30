import type { Metadata } from 'next';
import './globals.css';
import ReduxProvider from '@/components/common/redux-provider';
import { Toaster } from 'sonner';
import MetaDataProvider from '@/components/common/mateData-provider';
import { ThemeProvider } from '@/components/ui/theme-provider';

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <MetaDataProvider>{children}</MetaDataProvider>
          </ReduxProvider>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
