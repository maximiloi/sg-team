export default function PricesBlock() {
  const brakes = [
    { name: 'Диагностика', price: '0 ₽' },
    { name: 'Колодки', price: 'от 1000 ₽' },
    { name: 'Диски', price: 'от 1000 ₽' },
    { name: 'Суппорт (ремонт)', price: 'от 2000 ₽' },
    { name: 'Прокачка', price: 'от 1500 ₽' },
  ];

  const exhaust = [
    { name: 'Диагностика', price: '0 ₽' },
    { name: 'Глушитель', price: 'от 1500 ₽' },
    { name: 'Резонатор', price: 'от 1500 ₽' },
    { name: 'Гофра', price: 'от 3000 ₽' },
    { name: 'Сварка / ремонт', price: 'от 3000 ₽' },
  ];

  return (
    <section className='my-10 px-4 max-w-5xl mx-auto'>
      <h2 className='text-2xl sm:text-3xl font-bold text-center mb-8'>
        Цены от
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Тормоза */}
        <div className='bg-gray-50 rounded-xl p-6 shadow-sm'>
          <h3 className='text-xl font-semibold mb-4 text-center md:text-left'>
            Тормоза
          </h3>
          <ul className='space-y-3'>
            {brakes.map((item, i) => (
              <li key={i} className='flex justify-between text-base sm:text-lg'>
                <span>{item.name}</span>
                <span className='font-medium ml-2'>{item.price}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Глушители / выхлоп */}
        <div className='bg-gray-50 rounded-xl p-6 shadow-sm'>
          <h3 className='text-xl font-semibold mb-4 text-center md:text-left'>
            Глушители / выхлоп
          </h3>
          <ul className='space-y-3'>
            {exhaust.map((item, i) => (
              <li key={i} className='flex justify-between text-base sm:text-lg'>
                <span>{item.name}</span>
                <span className='font-medium'>{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className='text-center mt-8 text-gray-600 text-base sm:text-lg'>
        Точная цена после бесплатного осмотра
      </p>
    </section>
  );
}
