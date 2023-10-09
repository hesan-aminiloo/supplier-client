import clsx from 'clsx';
import { StepItem } from './StepItem';
import { IStepperProps } from './Stepper.types';

export const Stepper = ({ steps, activeStep, onChange, className, disabledIndex }: IStepperProps) => {
  return (
    <div className={clsx('w-full flex', className)}>
      {steps.map((step, index) => {
        const isDisabled =
          // eslint-disable-next-line no-nested-ternary
          disabledIndex !== null
            ? typeof disabledIndex === 'number'
              ? disabledIndex === index
              : disabledIndex?.includes(index)
            : false;
        return (
          <StepItem
            key={step.id}
            title={step.title}
            id={step.id}
            isActive={activeStep === step.id}
            step={index + 1}
            onClick={onChange}
            disabled={isDisabled}
          />
        );
      })}
    </div>
  );
};
