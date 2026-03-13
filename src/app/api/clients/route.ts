import { bot } from '@/lib/bot';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

const MANAGER_IDS = process.env.TELEGRAM_MANAGER_IDS!.split(',');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, phone, question = '' } = body;

    if (!firstName || !phone) {
      return NextResponse.json({ error: 'Имя и телефон обязательны' }, { status: 400 });
    }

    let client = await prisma.client.findUnique({
      where: { phone },
    });

    if (!client) {
      client = await prisma.client.create({
        data: { firstName, phone },
      });
    } else {
      client = await prisma.client.update({
        where: { id: client.id },
        data: { firstName },
      });
    }

    const request = await prisma.request.create({
      data: {
        clientId: client.id,
        question: question.trim() || null,
      },
    });

    for (const id of MANAGER_IDS) {
      const questionText = question?.trim() ? `\n❓ Вопрос: ${question.trim()}` : '';

      await bot.api.sendMessage(
        id,
        `📩 Новая заявка с сайта!\n\n` +
          `👤 ${firstName}\n` +
          `📱 ${phone}\n` +
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
      );
    }

    return NextResponse.json({ success: true, client, request }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Ошибка при обработке заявки' }, { status: 500 });
  }
}
