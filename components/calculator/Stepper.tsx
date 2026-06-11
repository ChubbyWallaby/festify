'use client';

import styles from './Stepper.module.css';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = ['Location', 'Venue', 'Furniture', 'Flowers', 'Services', 'Review'];

export default function Stepper({ currentStep, totalSteps }: StepperProps) {
  return (
    <nav className={styles.stepper} aria-label="Progress">
      <ol className={styles.steps}>
        {STEP_LABELS.slice(0, totalSteps).map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <li
              key={label}
              className={[
                styles.step,
                isCompleted ? styles.completed : '',
                isActive ? styles.active : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className={styles.stepDot} aria-hidden="true">
                {isCompleted ? '✓' : stepNumber}
              </span>
              <span className={styles.stepLabel}>{label}</span>
            </li>
          );
        })}
      </ol>
      <div className={styles.progressBar} aria-hidden="true">
        <div
          className={styles.progressFill}
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </nav>
  );
}
