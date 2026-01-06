'use client';

import { useState, useEffect } from 'react';
import styles from './CTAButton.module.css';

interface CTAButtonProps {
  onVisibilityChange?: (visible: boolean) => void;
  forceHide?: boolean;
}

export default function CTAButton({ onVisibilityChange, forceHide = false }: CTAButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.5;
      const visible = window.scrollY > scrollThreshold && !forceHide;
      setIsVisible(visible);
      onVisibilityChange?.(visible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onVisibilityChange, forceHide]);

  useEffect(() => {
    if (forceHide && isVisible) {
      setIsVisible(false);
      onVisibilityChange?.(false);
    }
  }, [forceHide, isVisible, onVisibilityChange]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href="#contact"
      className={`${styles.button} ${isVisible && !forceHide ? styles.buttonVisible : ''}`}
      onClick={handleClick}
    >
      Consultation Inquiries
    </a>
  );
}
