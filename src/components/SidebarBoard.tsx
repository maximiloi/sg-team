import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Session } from 'next-auth';

import SidebarCalendars from './SidebarCalendars';
import SidebarMenuNav from './SidebarMenuNav';
import SidebarUserNav from './SidebarUserNav';
import { Separator } from './ui/separator';

type Props = {
  session: Session | null;
};

export function SidebarBoard({ session }: Props) {
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader />
      <SidebarContent>
        <SidebarMenuNav />
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarCalendars />
        <Separator />
        {session?.user ? (
          <SidebarUserNav
            user={{
              name: session.user.name ?? '',
              email: session.user.email ?? '',
              avatar: session.user.image ?? '',
            }}
          />
        ) : null}
      </SidebarFooter>
    </Sidebar>
  );
}
