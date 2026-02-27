'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import FormTelegram from '../FormTelegram';

export default function ModalDiagnostics() {
  const [open, setOpen] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  return (
    <>
      <Button size="lg" onClick={() => setOpen(true)} className="w-full lg:flex-1">
        Записаться на бесплатную диагностику
      </Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title={showThanks ? '' : 'Оставьте ваши данные'}
        description={showThanks ? '' : 'Мы свяжемся с вами в ближайшее время'}
        cancelText={showThanks ? '' : 'Отмена'}
        footer={showThanks ? null : undefined}
        size="sm"
      >
        <FormTelegram
          onSuccess={() => {
            setShowThanks(true);
            setTimeout(() => {
              setShowThanks(false);
              setOpen(false);
            }, 2500);
          }}
        />
      </Modal>
    </>
  );
}
