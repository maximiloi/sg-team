'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

interface InputPhoneNumberProps {
  control: Control<FieldValues>;
  name?: string;
  label?: string;
  placeholder?: string;
}

export default function InputPhoneNumber({
  control,
  name = 'phone',
  label = 'Ваш номер телефона',
  placeholder = '+7 (___) ___-__-__',
}: InputPhoneNumberProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask='+7 (000) 000-00-00'
                  placeholder={placeholder}
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
                    ring-offset-background placeholder:text-muted-foreground 
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                    focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  inputMode='tel'
                  type='tel'
                />
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
