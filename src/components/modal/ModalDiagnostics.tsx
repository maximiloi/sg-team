"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import FormTelegram from "../FormTelegram";

export default function ModalDiagnostics() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className="mx-4 w-full" onClick={() => setOpen(true)}>
        Записаться на диагностику
      </Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Оставьте Ваши данные"
        description="Измените данные и нажмите Сохранить"
        size="sm"
        onConfirm={() => {
          // здесь твоя логика сохранения
          console.log("Данные сохранены");
          setOpen(false);
        }}
        confirmText="Отправить заявку"
      >
        <FormTelegram />
      </Modal>
    </>
  );
}
