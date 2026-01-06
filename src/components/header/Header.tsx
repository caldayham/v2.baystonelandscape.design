'use client';

import { useState, useCallback } from 'react';
import styles from './Header.module.css';
import CTAButton from '@/components/cta_button/CTAButton';

const navLinks = [
  { id: 'purpose', label: 'Purpose' },
  { id: 'process', label: 'Process' },
  { id: 'portfolio', label: 'Portfolio' },
];

interface HeaderProps {
  hideCtaButton?: boolean;
}

export default function Header({ hideCtaButton = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCta, setShowCta] = useState(false);

  const handleCtaVisibilityChange = useCallback((visible: boolean) => {
    setShowCta(visible);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={styles.navLink}
              onClick={(e) => handleNavClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <CTAButton onVisibilityChange={handleCtaVisibilityChange} forceHide={hideCtaButton} />

      {/* Mobile hamburger button - fixed at bottom right */}
      <button
        className={`${styles.hamburgerButton} ${showCta ? styles.hamburgerButtonShifted : ''}`}
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
      >
        <span className={`${styles.hamburgerIcon} ${isMenuOpen ? styles.hamburgerOpen : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {/* Mobile menu overlay */}
      <div className={`${styles.mobileOverlay} ${isMenuOpen ? styles.mobileOverlayOpen : ''}`}>
        <nav className={styles.mobileNav}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={styles.mobileNavLink}
              onClick={(e) => handleNavClick(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
