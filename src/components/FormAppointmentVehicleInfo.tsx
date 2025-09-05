'use client';

import { checkClientByPhone } from '@/actions/client';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import vinDecoder from 'vin-decode';

type Car = {
  id: string;
  vin: string;
  make: string;
  model: string;
  plate: string;
};

export default function FormAppointmentVehicleInfo() {
  const { control, setValue, register, watch } = useFormContext();
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [clientCars, setClientCars] = useState<Car[]>([]);
  const phone = watch('phone');

  useEffect(() => {
    const fetchClientCars = async () => {
      if (phone && phone.length === 18) {
        const client = await checkClientByPhone({ phone });
        if (client && client.cars) {
          setClientCars(client.cars as Car[]);
          setShowVehicleForm(false);
        } else {
          setClientCars([]);
          setShowVehicleForm(true);
        }
      } else {
        setClientCars([]);
        setShowVehicleForm(false);
      }
    };

    fetchClientCars();
  }, [phone]);

  const handleVinChange = (vin: string) => {
    if (vin && vin.length === 17) {
      const result = vinDecoder(vin).decode();
      if (result) {
        setValue('make', result.manufacturer);
        setValue('model', result.details);
      }
    }
  };

  const handleSelectCar = (car: Car) => {
    setValue('vin', car.vin);
    setValue('make', car.make);
    setValue('model', car.model);
    setValue('plate', car.plate);
    setShowVehicleForm(true);
  };

  const handleAddNewCar = () => {
    setValue('vin', '');
    setValue('make', '');
    setValue('model', '');
    setValue('plate', '');
    setShowVehicleForm(true);
  };

  return (
    <div>
      <h3 className='font-medium mb-2'>Автомобиль</h3>
      {phone && phone.length === 18 && (
        <div className='mb-2'>
          {clientCars.length > 0 ? (
            <div className='space-y-2'>
              {clientCars.map((car) => (
                <Button
                  key={car.id}
                  type='button'
                  variant='outline'
                  onClick={() => handleSelectCar(car)}
                  className='w-full justify-start'
                >
                  {car.make} {car.model} ({car.plate})
                </Button>
              ))}
              <Button
                type='button'
                variant='outline'
                onClick={handleAddNewCar}
                className='w-full'
              >
                Добавить автомобиль
              </Button>
            </div>
          ) : null}
        </div>
      )}
      {showVehicleForm && (
        <>
          <FormField
            control={control}
            name='vin'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='VIN'
                    {...field}
                    onChange={(e) => {
                      const upperCaseValue = e.target.value.toUpperCase();
                      field.onChange(upperCaseValue);
                      handleVinChange(upperCaseValue);
                    }}
                    className='mb-2'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Input placeholder='Марка' {...register('make')} className='mb-2' />
          <Input placeholder='Модель' {...register('model')} className='mb-2' />
          <Input
            placeholder='Госномер'
            {...register('plate')}
            className='mb-2'
          />
        </>
      )}
    </div>
  );
}
