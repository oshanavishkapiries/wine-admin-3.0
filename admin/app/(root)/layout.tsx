import { AppSidebar } from '@/components/common/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-full flex flex-col">
        <div className="w-fill h-[50px] flex flex-row p-4 items-center justify-between">
          <SidebarTrigger />
        </div>

        {children}
      </main>
    </SidebarProvider>
  );
};

export default layout;
