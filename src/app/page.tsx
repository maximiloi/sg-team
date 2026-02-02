import FormTelegram from "@/components/FormTelegram";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <Header />
      <main className="md:flex md:items-center md:justify-center">
        <Hero />

        <Card className="relative z-10 w-full max-w-[22rem]">
          <CardHeader>
            <CardTitle className="text-3xl">Мы обновляемся для вас!</CardTitle>
            <CardDescription className="text-lg">
              Заполните форму, и мы обязательно вам перезвоним!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormTelegram />
          </CardContent>
        </Card>
      </main>
    </>
  );
}
