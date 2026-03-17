'use client';

import { checkClientByPhone } from '@/actions/client';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
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
  const [hasClientData, setHasClientData] = useState(false);
  const [clientCars, setClientCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const phone = watch('phone');

  useEffect(() => {
    const fetchClientCars = async () => {
      if (phone && phone.length === 18) {
        const client = await checkClientByPhone({ phone });
        if (client && client.cars && client.cars.length > 0) {
          setClientCars(client.cars as Car[]);
          setHasClientData(true);
        } else {
          setClientCars([]);
          setHasClientData(true);
        }
      } else {
        setClientCars([]);
        setHasClientData(false);
        setSelectedCarId(null);
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
    setSelectedCarId(car.id);
  };

  const handleAddNewCar = () => {
    setValue('vin', '');
    setValue('make', '');
    setValue('model', '');
    setValue('plate', '');
    setSelectedCarId(null);
  };

  const handleBackToSelection = () => {
    setValue('vin', '');
    setValue('make', '');
    setValue('model', '');
    setValue('plate', '');
    setSelectedCarId(null);
  };

  return (
    <div>
      <h3 className="mb-2 font-medium">Автомобиль</h3>
      {phone && phone.length === 18 && hasClientData && clientCars.length > 0 && !selectedCarId && (
        <div className="mb-2 space-y-2">
          <p className="text-muted-foreground text-sm">Выберите автомобиль или добавьте новый:</p>
          {clientCars.map((car) => (
            <Button
              key={car.id}
              type="button"
              variant="outline"
              onClick={() => handleSelectCar(car)}
              className="w-full justify-start"
            >
              {car.make} {car.model} ({car.plate})
            </Button>
          ))}
          <Button type="button" variant="outline" onClick={handleAddNewCar} className="w-full">
            Добавить автомобиль
          </Button>
        </div>
      )}
      {(selectedCarId !== null ||
        (phone && phone.length === 18 && hasClientData && clientCars.length === 0) ||
        !hasClientData) && (
        <>
          {clientCars.length > 0 && selectedCarId !== null && (
            <Button
              type="button"
              variant="ghost"
              onClick={handleBackToSelection}
              className="mb-2 w-full"
            >
              ← Выбрать другой автомобиль
            </Button>
          )}
          <FormField
            control={control}
            name="vin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="VIN"
                    {...field}
                    onChange={(e) => {
                      const upperCaseValue = e.target.value.toUpperCase();
                      field.onChange(upperCaseValue);
                      handleVinChange(upperCaseValue);
                    }}
                    className="mb-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Input placeholder="Марка" {...register('make')} className="mb-2" />
          <Input placeholder="Модель" {...register('model')} className="mb-2" />
          <Input placeholder="Госномер" {...register('plate')} className="mb-2" />
        </>
      )}
    </div>
  );
}
