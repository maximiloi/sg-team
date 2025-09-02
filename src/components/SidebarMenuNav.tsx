'use client';

import { Briefcase, ClipboardList, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';

const items = [
  { title: 'Главная', url: '/board', icon: Home },
  { title: 'Заявки', url: '/board/request', icon: ClipboardList },
  { title: 'В работе', url: '/board/active', icon: Briefcase },
  // { title: 'Search', url: '/search', icon: Search },
  // { title: 'Settings', url: '/settings', icon: Settings },
];

export default function SidebarMenuNav() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Super Garage Team</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <a
                    href={item.url}
                    className={`flex items-center gap-2 rounded-xl px-3 py-2 transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <item.icon size={18} />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
