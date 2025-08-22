import { Bot } from 'grammy';
import { NextResponse } from 'next/server';

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

const MANAGER_IDS = process.env.TELEGRAM_MANAGER_IDS.split(',');

export async function POST(req: Request) {
  try {
    const body = await req.json();

    for (const id of MANAGER_IDS) {
      await bot.api.sendMessage(
        id,
        `📩 Новая заявка с сайта sg-team.ru!\n\n👤 ${body.username}\n📱 ${body.phone}`
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
