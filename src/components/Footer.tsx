'use client';

import { useState } from 'react';

import { Send } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [open, setOpen] = useState(false);

  return (
    <footer className="bg-primary text-primary-foreground py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm md:text-base">
              © 2025 - {currentYear} Super Garage Team. Все права защищены.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="text-sm transition-opacity hover:opacity-80 md:text-base">
                  Политика конфиденциальности
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Политика конфиденциальности</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-sm md:text-base">
                  <section>
                    <h3 className="mb-2 font-semibold">1. Общие положения</h3>
                    <p className="text-muted-foreground">
                      Настоящая политика конфиденциальности описывает, как Super Garage Team
                      собирает, использует и защищает вашу личную информацию.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-2 font-semibold">2. Сбор информации</h3>
                    <p className="text-muted-foreground">
                      Мы собираем информацию, которую вы предоставляете нам при использовании наших
                      услуг, включая имя, контактные данные и информацию о вашем автомобиле.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-2 font-semibold">3. Использование информации</h3>
                    <p className="text-muted-foreground">
                      Собранная информация используется для предоставления услуг, связи с клиентами
                      и улучшения качества обслуживания.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-2 font-semibold">4. Защита информации</h3>
                    <p className="text-muted-foreground">
                      Мы принимаем все необходимые меры для защиты вашей личной информации от
                      несанкционированного доступа и разглашения.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-2 font-semibold">5. Контакты</h3>
                    <p className="text-muted-foreground">
                      По вопросам, связанным с политикой конфиденциальности, обращайтесь по
                      контактам, указанным на сайте.
                    </p>
                  </section>
                </div>
              </DialogContent>
            </Dialog>
            <a
              href="https://t.me/SuperGarageTeam_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-80 md:text-base"
            >
              <Send className="h-4 w-4" />
              Telegram бот
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
