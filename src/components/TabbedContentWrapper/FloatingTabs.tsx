'use client';

import React, { useState, useEffect } from 'react';
import styles from './FloatingTabs.module.css';

const tabs = [
  { id: 'purpose', label: 'Purpose' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Inquire' },
];

export default function FloatingTabs() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollCenter = window.scrollY + window.innerHeight / 2;
      let foundSection = '';

      // Find active section based on scroll position
      for (const { id } of tabs) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = window.scrollY + rect.top;
          const sectionHeight = element.offsetHeight;

          if (scrollCenter >= sectionTop && scrollCenter < sectionTop + sectionHeight) {
            foundSection = id;
            break;
          }
        }
      }

      setActiveSection(foundSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.tabsContainer}>
      {tabs.map(({ id, label }) => {
        const active = activeSection === id;

        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
            className={`${styles.tab} ${active ? styles.tabActive : ''}`}
          >
            {label}
          </a>
        );
      })}
    </div>
  );
}
