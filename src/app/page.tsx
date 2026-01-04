import Header from '@/components/header/Header';
import Hero from '@/components/hero/Hero';
import Purpose from '@/components/purpose';
import Portfolio from '@/components/portfolio/Portfolio';
import ConsultationForm from '@/components/contact/ConsultationForm';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Purpose />
      <Portfolio />
      <ConsultationForm />
    </>
  );
}
