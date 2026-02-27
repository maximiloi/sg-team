'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import FormTelegram from '../FormTelegram';

export default function ModalAppointment() {
  const [open, setOpen] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  return (
    <>
      <Button className="w-full" size="sm" onClick={() => setOpen(true)}>
        Записаться
      </Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title={showThanks ? '' : 'Оставьте ваши данные, мы перезвоним Вам'}
        description={showThanks ? '' : 'Мы перезвоним Вам в ближайшее рабочее время'}
        cancelText={showThanks ? '' : 'Отмена'}
        footer={showThanks ? null : undefined}
        size="sm"
      >
        <FormTelegram
          buttonText={showThanks ? '' : 'Записаться 📅'}
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
