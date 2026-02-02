import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="mx-4">
      <h1 className="my-8 scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Ремонт и ТО автомобилей от&nbsp;30&nbsp;минут с&nbsp;гарантией
        до&nbsp;12 месяцев
      </h1>
      <h3 className="my-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
        Без лишних затрат и&nbsp;ожиданий. Запишитесь онлайн и&nbsp;получите
        бесплатную диагностику.
      </h3>

      <Button>Записаться на ремонт</Button>
    </section>
  );
}
