import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { siderNavigation } from '@/constants/siderNavigation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { NavUser } from './nav-user';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <img
            src="/logo.png"
            alt="Wine Admin Logo"
            className="h-8 w-auto"
          />
          <span className="font-semibold text-lg">Wine Admin</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {siderNavigation.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item?.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <Link href={item.url} prefetch={true} passHref>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        {item.subItems && item.subItems.length > 0 && (
                          <CollapsibleTrigger asChild>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </CollapsibleTrigger>
                        )}
                      </SidebarMenuButton>
                    </Link>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subItems?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.url} prefetch={true}>
                                {subItem.icon && <subItem.icon />}
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
    </Sidebar>
  );
}
