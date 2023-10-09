import { Icon } from '@src/components/icon';
import { Theme } from '@src/style';
import clsx from 'clsx';
import { FC } from 'react';
import { ActionTypeEnum, ITimeSliderProps } from './TimeSlider.types';

export const TimeSlider: FC<ITimeSliderProps> = ({ changeValue, value, className }) => {
  const IncValue = () => {
    changeValue(ActionTypeEnum.UP);
  };

  const DecValue = () => {
    changeValue(ActionTypeEnum.DOWN);
  };
  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      <button onClick={IncValue}>
        <Icon
          name="arrow-up-2"
          color={Theme.colors.neutral900}
          size="sm"
        />
      </button>
      <p>{value < 10 && typeof value === 'number' ? `0${value}` : value}</p>
      <button onClick={DecValue}>
        <Icon
          name="arrow-down-1"
          color={Theme.colors.neutral900}
          size="sm"
        />
      </button>
    </div>
  );
};
