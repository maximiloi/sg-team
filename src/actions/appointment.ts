'use server';

import { AppointmentStatus } from '@/generated/prisma';
import { formatDateForDB } from '@/lib/dateUtils';
import { prisma } from '@/lib/prisma';
import { endOfDay, startOfDay } from 'date-fns';

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
    const appointmentDate = formatDateForDB(data.date, data.time);
    const appointment = await prisma.appointment.create({
      data: {
        date: appointmentDate,
        type: data.type,
        comment: data.comment,
        status: 'SCHEDULED',
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
      (appt) => appt.date.toDateString() === today.toDateString()
    );
    const tomorrowAppointments = appointments.filter(
      (appt) => appt.date.toDateString() === tomorrow.toDateString()
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

export async function getAppointmentsForCalendar(
  startDate: Date,
  endDate: Date
) {
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
