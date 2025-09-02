'use client';

import { Plus } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function ButtonCreateRecord() {
  const pathname = usePathname();
  const router = useRouter();

  const isActiveBoard = pathname.includes('/board/active');
  const isCreatePage = pathname.startsWith('/board/active/create');

  if (!isActiveBoard || isCreatePage) {
    return null;
  }

  return (
    <Button
      onClick={() => router.push('/board/active/create')}
      className='flex items-center gap-2'
    >
      <Plus className='mr-2' />
      Создать запись
    </Button>
  );
}
