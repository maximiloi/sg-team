'use server';

import { AppointmentStatus } from '@/generated/prisma';
import { formatDateForDB } from '@/lib/dateUtils';
import { prisma } from '@/lib/prisma';
import { AppointmentInput, appointmentSchema, sanitizeString } from '@/lib/validations';
import { endOfDay, startOfDay } from 'date-fns';
import { z } from 'zod';

export async function createAppointment(rawData: unknown) {
  // Валидация входных данных
  const validation = appointmentSchema.safeParse(rawData);

  if (!validation.success) {
    const errors = validation.error.issues.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));

    console.error('[createAppointment] Validation error:', errors);
    return {
      success: false,
      error: 'Ошибка валидации данных',
      details: errors,
    };
  }

  const data: AppointmentInput = validation.data;

  try {
    // Санитизация строковых данных
    const sanitizedFirstName = data.firstName ? sanitizeString(data.firstName) : undefined;
    const sanitizedLastName = data.lastName ? sanitizeString(data.lastName) : undefined;
    const sanitizedTelegramId = data.telegramId || undefined;
    const sanitizedVIN = data.vin ? data.vin.toUpperCase().trim() : undefined;
    const sanitizedPlate = data.plate ? data.plate.toUpperCase().trim() : undefined;
    const sanitizedMake = data.make ? sanitizeString(data.make) : undefined;
    const sanitizedModel = data.model ? sanitizeString(data.model) : undefined;
    const sanitizedComment = data.comment ? sanitizeString(data.comment.trim()) : null;

    // Нормализация телефона (только цифры)
    const normalizedPhone = data.phone.replace(/\D/g, '');

    // Проверяем или создаем/обновляем клиента
    let client = await prisma.client.findUnique({
      where: { phone: normalizedPhone },
    });

    if (client) {
      client = await prisma.client.update({
        where: { phone: normalizedPhone },
        data: {
          firstName: sanitizedFirstName || client.firstName,
          lastName: sanitizedLastName ?? client.lastName,
          telegramId: sanitizedTelegramId || client.telegramId,
        },
      });
    } else {
      if (!sanitizedFirstName) {
        return { success: false, error: 'Имя обязательно для записи' };
      }

      client = await prisma.client.create({
        data: {
          phone: normalizedPhone,
          firstName: sanitizedFirstName,
          lastName: sanitizedLastName,
          telegramId: sanitizedTelegramId,
        },
      });
    }

    // Проверяем или создаем/обновляем автомобиль
    let car;
    if (sanitizedVIN || sanitizedPlate) {
      const whereConditions = [];
      if (sanitizedVIN) whereConditions.push({ vin: sanitizedVIN });
      if (sanitizedPlate) whereConditions.push({ plate: sanitizedPlate });

      car = await prisma.car.findFirst({
        where: { OR: whereConditions },
      });

      if (car) {
        car = await prisma.car.update({
          where: { id: car.id },
          data: {
            vin: sanitizedVIN || car.vin,
            plate: sanitizedPlate || car.plate,
            make: sanitizedMake || car.make,
            model: sanitizedModel || car.model,
          },
        });
      } else {
        car = await prisma.car.create({
          data: {
            vin: sanitizedVIN || 'Не указано',
            plate: sanitizedPlate || 'Не указано',
            make: sanitizedMake || 'Не указано',
            model: sanitizedModel || 'Не указано',
            clientId: client.id,
          },
        });
      }
    }

    // Создаем запись (Appointment)
    const appointmentDate = formatDateForDB(data.date, data.time);
    const appointment = await prisma.appointment.create({
      data: {
        date: appointmentDate,
        type: data.type,
        comment: sanitizedComment,
        status: AppointmentStatus.SCHEDULED,
        clientId: client.id,
        carId: car?.id,
      },
    });

    return { success: true, appointment };
  } catch (error) {
    console.error('[createAppointment] Unexpected error:', error);

    if (error instanceof z.ZodError) {
      return { success: false, error: 'Ошибка валидации данных' };
    }

    return { success: false, error: 'Не удалось создать запись' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getActiveAppointments() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Начало текущего дня
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(tomorrow.getDate() + 1);

    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: today,
          lt: dayAfterTomorrow,
        },
      },
      include: {
        client: {
          select: {
            phone: true,
            firstName: true,
            lastName: true,
            telegramId: true,
          },
        },
        car: {
          select: { vin: true, plate: true, make: true, model: true },
        },
      },
      orderBy: [{ date: 'asc' }],
    });

    // Разделяем записи на сегодня и завтра
    const todayAppointments = appointments.filter(
      (appt) => appt.date.toDateString() === today.toDateString(),
    );
    const tomorrowAppointments = appointments.filter(
      (appt) => appt.date.toDateString() === tomorrow.toDateString(),
    );

    return {
      today: todayAppointments,
      tomorrow: tomorrowAppointments,
    };
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return { today: [], tomorrow: [], error: 'Не удалось загрузить записи' };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAppointmentsForCalendar(startDate: Date, endDate: Date) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
        status: {
          notIn: [AppointmentStatus.DONE, AppointmentStatus.CANCELLED],
        },
      },
      select: {
        id: true,
        date: true,
        status: true,
      },
    });

    return { appointments, error: null };
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return { appointments: [], error: 'Failed to fetch appointments' };
  }
}

export async function getAppointmentsByDate(selectedDate: Date) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        OR: [
          // Записи, начинающиеся на выбранную дату
          {
            date: {
              gte: startOfDay(selectedDate),
              lte: endOfDay(selectedDate),
            },
            status: {
              notIn: [AppointmentStatus.DONE, AppointmentStatus.CANCELLED],
            },
          },
          // Записи IN_PROGRESS с датой начала <= выбранной дате
          {
            status: AppointmentStatus.IN_PROGRESS,
            date: {
              lte: endOfDay(selectedDate),
            },
          },
        ],
      },
      include: {
        client: true,
        car: true,
      },
    });

    return { appointments, error: null };
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return { appointments: [], error: 'Failed to fetch appointments' };
  }
}

export async function getAppointmentById(id: string) {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        client: true,
        car: true,
      },
    });
    return { appointment, error: null };
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return { appointment: null, error: 'Failed to fetch appointment' };
  }
}
