import clsx from 'clsx';
import { t } from 'i18next';
import { IStepperItemProps } from './Stepper.types';

export const StepItem = ({ id, title, step, onClick, isActive, disabled }: IStepperItemProps) => {
  return (
    <button
      className={clsx('flex border-b-4 border-neutral-200 pb-4 flex-1', {
        'border-primary-100': isActive,
      })}
      disabled={disabled}
      onClick={() => !disabled && onClick?.(id)}
    >
      <div
        className={clsx('rounded-full border-2  flex items-center justify-center w-10 h-10', {
          'border-primary-500 bg-white text-primary-500': isActive,
          'border-stroke-12 text-neutral-500': !isActive,
        })}
      >
        {step}
      </div>
      <div className="flex flex-col pl-4 text-left">
        <span className="uppercase text-neutral-500 text-xs ">{`${t('shared.step')} ${step}`}</span>
        <div className="text-neutral-900 font-medium text-base">{title}</div>
      </div>
    </button>
  );
};
