import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';
import { auth } from '../auth/authSetup';

import { SidebarBoard } from '@/components/SidebarBoard';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return (
    <SidebarProvider>
      <SidebarBoard session={session} />
      <main className='w-full p-4'>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
