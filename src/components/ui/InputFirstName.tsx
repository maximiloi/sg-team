'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control, FieldValues } from 'react-hook-form';

interface InputFirstNameProps {
  control: Control<FieldValues>;
  name?: string;
  label?: string;
  placeholder?: string;
}

export default function InputFirstName({
  control,
  name = 'username',
  label = 'Как к вам обращаться?',
  placeholder = 'Иван',
}: InputFirstNameProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              onChange={(e) => {
                const value = e.target.value.replace(/[^А-Яа-яA-Za-z]/g, '');
                field.onChange(value);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
