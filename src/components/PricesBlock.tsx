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
    <section className="mx-auto my-10 max-w-5xl px-4">
      <h2 className="mb-8 text-center text-2xl font-bold sm:text-3xl">Цены от</h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Тормоза */}
        <div className="rounded-xl bg-gray-50 p-6 shadow-sm">
          <h3 className="mb-4 text-center text-xl font-semibold md:text-left">Тормоза</h3>
          <ul className="space-y-3">
            {brakes.map((item, i) => (
              <li key={i} className="flex justify-between text-base sm:text-lg">
                <span>{item.name}</span>
                <span className="ml-2 font-medium">{item.price}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Глушители / выхлоп */}
        <div className="rounded-xl bg-gray-50 p-6 shadow-sm">
          <h3 className="mb-4 text-center text-xl font-semibold md:text-left">
            Глушители / выхлоп
          </h3>
          <ul className="space-y-3">
            {exhaust.map((item, i) => (
              <li key={i} className="flex justify-between text-base sm:text-lg">
                <span>{item.name}</span>
                <span className="font-medium">{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-8 text-center text-base text-gray-600 sm:text-lg">
        Точная цена после бесплатного осмотра
      </p>
    </section>
  );
}
