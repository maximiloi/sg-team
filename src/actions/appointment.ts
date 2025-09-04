'use server';

import { prisma } from '@/lib/prisma';

export async function createAppointment(data: {
  phone: string;
  firstName?: string;
  lastName?: string;
  telegramId?: string;
  vin?: string;
  plate?: string;
  make?: string;
  model?: string;
  date: string;
  time: string;
  type: 'MAINTENANCE' | 'DIAGNOSTICS' | 'REPAIR';
  comment?: string;
}) {
  try {
    // Проверяем или создаем/обновляем клиента
    let client = await prisma.client.findUnique({
      where: { phone: data.phone },
    });

    if (client) {
      // Обновляем данные клиента, если они предоставлены
      client = await prisma.client.update({
        where: { phone: data.phone },
        data: {
          firstName: data.firstName || client.firstName,
          lastName: data.lastName || client.lastName,
          telegramId: data.telegramId || client.telegramId,
        },
      });
    } else {
      // Создаем нового клиента
      client = await prisma.client.create({
        data: {
          phone: data.phone,
          firstName: data.firstName || 'Не указано',
          lastName: data.lastName,
          telegramId: data.telegramId,
        },
      });
    }

    // Проверяем или создаем/обновляем автомобиль
    let car;
    if (data.vin || data.plate) {
      car = await prisma.car.findFirst({
        where: {
          OR: [{ vin: data.vin }, { plate: data.plate }].filter(
            (condition) => Object.values(condition)[0]
          ), // Исключаем undefined/null
        },
      });

      if (car) {
        // Обновляем данные автомобиля, если они предоставлены
        car = await prisma.car.update({
          where: { id: car.id },
          data: {
            vin: data.vin || car.vin,
            plate: data.plate || car.plate,
            make: data.make || car.make,
            model: data.model || car.model,
          },
        });
      } else {
        // Создаем новый автомобиль
        car = await prisma.car.create({
          data: {
            vin: data.vin || 'Не указано',
            plate: data.plate || 'Не указано',
            make: data.make || 'Не указано',
            model: data.model || 'Не указано',
            clientId: client.id,
          },
        });
      }
    }

    // Создаем запись (Appointment)
    const appointmentDate = new Date(
      `${data.date.split('T')[0]}T${data.time}:00Z`
    );
    const appointment = await prisma.appointment.create({
      data: {
        date: appointmentDate,
        type: data.type,
        comment: data.comment,
        clientId: client.id,
        carId: car?.id,
      },
    });

    return { success: true, appointment };
  } catch (error) {
    console.error('Error creating appointment:', error);
    return { success: false, error: 'Не удалось создать запись' };
  } finally {
    await prisma.$disconnect();
  }
}
