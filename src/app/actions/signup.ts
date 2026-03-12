'use server';

import { SignupData } from '@/components/FormRegistration';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function signupAction(data: SignupData) {
  const { name, email, password } = data;

  if (!name || !email || !password) throw new Error('Заполните все поля');

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('Email уже зарегистрирован');

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, email, password: hashed },
  });
}
