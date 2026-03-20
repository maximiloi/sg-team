import { bot } from '@/lib/bot';
import { prisma } from '@/lib/prisma';
import { requestSchema, sanitizeString } from '@/lib/validations';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const MANAGER_IDS = process.env.TELEGRAM_MANAGER_IDS?.split(',').filter(Boolean) || [];

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Валидация входных данных через Zod схему
    const validation = requestSchema.safeParse(body);

    if (!validation.success) {
      const errors = validation.error.issues.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));

      console.error('[API /clients] Validation error:', errors);
      return NextResponse.json({ error: 'Ошибка валидации', details: errors }, { status: 400 });
    }

    const { firstName, phone, question } = validation.data;

    // Санитизация входных данных
    const sanitizedFirstName = sanitizeString(firstName);
    const sanitizedQuestion = question ? sanitizeString(question) : null;

    // Проверяем существование клиента по телефону
    let client = await prisma.client.findUnique({
      where: { phone },
    });

    if (!client) {
      // Создаём нового клиента
      client = await prisma.client.create({
        data: {
          firstName: sanitizedFirstName,
          phone,
        },
      });
    } else {
      // Обновляем имя существующего клиента
      client = await prisma.client.update({
        where: { id: client.id },
        data: { firstName: sanitizedFirstName },
      });
    }

    // Создаём заявку
    const request = await prisma.request.create({
      data: {
        clientId: client.id,
        question: sanitizedQuestion,
      },
    });

    // Отправляем уведомления менеджерам
    if (MANAGER_IDS.length > 0) {
      const questionText = sanitizedQuestion ? `\n❓ Вопрос: ${sanitizedQuestion}` : '';

      const notifications = MANAGER_IDS.map((id) =>
        bot.api.sendMessage(
          id,
          `📩 Новая заявка с сайта!\n\n` +
            `👤 ${sanitizedFirstName}\n` +
            `📱 +7 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9, 11)}\n` +
            `${questionText}\n\n` +
            `🆕 Обращение #${request.id}`,
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: '🔗 Открыть заявку',
                    url: `${process.env.NEXTAUTH_URL}/board/request/${request.id}`,
                  },
                ],
              ],
            },
          },
        ),
      );

      await Promise.allSettled(notifications);
    }

    return NextResponse.json({ success: true, client, request }, { status: 201 });
  } catch (error) {
    console.error('[API /clients] Unexpected error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Ошибка валидации данных' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Ошибка при обработке заявки' }, { status: 500 });
  }
}
