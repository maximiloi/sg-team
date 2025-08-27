import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import { auth, signOut } from '../auth/authSetup';

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return (
    <div>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <Button type='submit'>Sign Out</Button>
      </form>

      <div>Board</div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
