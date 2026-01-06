'use client';

import { useState, useCallback } from 'react';
import Header from '@/components/header/Header';
import Hero from '@/components/hero/Hero';
import Purpose from '@/components/purpose';
import Process from '@/components/process/Process';
import Portfolio from '@/components/portfolio/Portfolio';
import IntakeForm from '@/components/intake_form/IntakeForm';

export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleFormVisible = useCallback((visible: boolean) => {
    setIsFormVisible(visible);
  }, []);

  return (
    <>
      <Header hideCtaButton={isFormVisible} />
      <Hero />
      <Purpose />
      <Process />
      <Portfolio />
      <IntakeForm onFormVisible={handleFormVisible} />
    </>
  );
}
