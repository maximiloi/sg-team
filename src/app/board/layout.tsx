import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';
import { auth } from '../auth/authSetup';

import ButtonCreateRecord from '@/components/ButtonCreateRecord';
import { SidebarBoard } from '@/components/SidebarBoard';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <SidebarProvider>
      <SidebarBoard session={session} />
      <main className="w-full p-4">
        <div className="flex justify-between">
          <div>
            <SidebarTrigger /> | Super Garage Team
          </div>
          <div>
            <ButtonCreateRecord />
          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
