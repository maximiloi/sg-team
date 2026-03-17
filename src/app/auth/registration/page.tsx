import { auth } from '@/app/auth/authSetup';
import FormRegistration from '@/components/FormRegistration';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (session?.user) {
    redirect('/board');
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <FormRegistration />
      </div>
    </div>
  );
}
