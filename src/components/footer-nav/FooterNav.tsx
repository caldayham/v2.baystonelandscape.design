'use client';

import { useState, useEffect } from 'react';
import styles from './FooterNav.module.css';

const sections = [
  { id: 'purpose', label: 'Purpose' },
  { id: 'process', label: 'Process' },
  { id: 'portfolio', label: 'Portfolio' },
];

export default function FooterNav() {
  const [activeSection, setActiveSection] = useState('');
  const [showConsultButton, setShowConsultButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const halfPage = window.innerHeight / 2;

      // Show consultation button after scrolling half the page
      setShowConsultButton(window.scrollY > halfPage);

      // Find active section
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      for (const { id, element } of sectionElements) {
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionHeight = element.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClass = (sectionId: string) => {
    const classes = [styles.footerNavLink];

    if (activeSection === sectionId) {
      classes.push(styles.footerNavLinkActive);
    }

    return classes.join(' ');
  };

  return (
    <nav className={styles.footerNav}>
      <div className={styles.centerLinks}>
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={getLinkClass(section.id)}
            data-section={section.id}
          >
            {section.label}
          </a>
        ))}
      </div>
      <a
        href="#contact"
        className={`${styles.consultButton} ${showConsultButton ? styles.consultButtonVisible : ''}`}
      >
        Book a Consultation
      </a>
    </nav>
  );
}
