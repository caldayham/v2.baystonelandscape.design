'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './IntakeForm.module.css';

interface IntakeFormProps {
  onFormVisible?: (visible: boolean) => void;
}

export default function IntakeForm({ onFormVisible }: IntakeFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    isLocal: null as boolean | null,
    projectDescription: '',
    name: '',
    phone: '',
  });
  const formRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          onFormVisible?.(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, [onFormVisible]);

  const handleLocalSelect = (isLocal: boolean) => {
    setFormData({ ...formData, isLocal });
    setCurrentStep(2);
  };

  const handleNext = () => {
    if (currentStep === 2 && formData.projectDescription.trim()) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (formData.name && formData.phone) {
      alert('Thank you! We will contact you shortly.');
    }
  };

  const getStepDotClass = (step: number) => {
    if (currentStep === step) return `${styles.stepDot} ${styles.stepDotActive}`;
    if (currentStep > step) return `${styles.stepDot} ${styles.stepDotCompleted}`;
    return styles.stepDot;
  };

  const getStepClass = (step: number) => {
    if (currentStep === step) return `${styles.formStep} ${styles.stepActive}`;
    if (currentStep > step) return `${styles.formStep} ${styles.stepLeft}`;
    return `${styles.formStep} ${styles.stepRight}`;
  };

  return (
    <section className={styles.formSection} id="contact" ref={formRef}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>Get Started</h2>
          <p className={styles.formSubtitle}>Book a free consultation to discuss your project</p>
        </div>

        <div className={styles.formCard}>
          <div className={styles.stepIndicator}>
            <div className={getStepDotClass(1)}>1</div>
            <div className={styles.stepLine}></div>
            <div className={getStepDotClass(2)}>2</div>
            <div className={styles.stepLine}></div>
            <div className={getStepDotClass(3)}>3</div>
          </div>

          <div className={styles.formContent}>
            {/* Step 1: Location Question */}
            <div className={getStepClass(1)}>
              <div className={styles.slideContent}>
                <h3 className={styles.slideQuestion}>Do you live within 30 minutes of Palo Alto?</h3>
                <p className={styles.slideNote}>*CFC is typically a local-only company, San Francisco to San Jose.</p>

                <div className={styles.buttonGroup}>
                  <button
                    type="button"
                    className={`${styles.optionButton} ${formData.isLocal === true ? styles.optionButtonSelected : ''}`}
                    onClick={() => handleLocalSelect(true)}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={`${styles.optionButton} ${formData.isLocal === false ? styles.optionButtonSelected : ''}`}
                    onClick={() => handleLocalSelect(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Project Description */}
            <div className={getStepClass(2)}>
              <div className={styles.slideContent}>
                <h3 className={styles.slideQuestion}>Tell us a little more about your project</h3>

                <textarea
                  className={styles.textarea}
                  placeholder="Looking for a full outdoor redesign, maybe a pool as well"
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  rows={5}
                />

                <div className={styles.navigationButtons}>
                  <button type="button" className={styles.backButton} onClick={handleBack}>
                    Back
                  </button>
                  <button
                    type="button"
                    className={styles.nextButton}
                    onClick={handleNext}
                    disabled={!formData.projectDescription.trim()}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: Contact Information */}
            <div className={getStepClass(3)}>
              <div className={styles.slideContent}>
                <h3 className={styles.slideQuestion}>What&apos;s your name and phone number?</h3>
                <p className={styles.privacyNote}>We only use your information to contact you directly. We never share or sell your information.</p>

                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    type="tel"
                    className={styles.input}
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className={styles.navigationButtons}>
                  <button type="button" className={styles.backButton} onClick={handleBack}>
                    Back
                  </button>
                  <button
                    type="button"
                    className={styles.submitButton}
                    onClick={handleSubmit}
                    disabled={!formData.name || !formData.phone}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
