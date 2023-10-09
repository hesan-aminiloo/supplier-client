/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import RenderWhen from '@src/components/RenderWhen';
import { FC, SyntheticEvent, useId } from 'react';
import clsx from 'clsx';

import { SwitchProps } from './Switch.types';
import styles from './Switch.module.scss';

export const Switch: FC<SwitchProps> = ({
  id,
  onChange,
  label,
  labelClassName,
  size = 'lg',
  disabled,
  ...restProps
}) => {
  const inputId = useId();
  const handleChangeCheckBox = (evt: SyntheticEvent) => {
    evt.stopPropagation();
    const target = evt.target as HTMLInputElement;
    onChange?.(Boolean(target.checked));
  };
  return (
    <div className="relative flex flex-col gap-y-2">
      <RenderWhen is={label}>
        <div className={clsx('font-medium text-sm pb-1 inline-block', labelClassName)}>{label}</div>
      </RenderWhen>

      <div className={styles[`switch-wrapper--${size}`]}>
        <input
          {...restProps}
          type="checkbox"
          id={id || inputId}
          onChange={handleChangeCheckBox}
          disabled={disabled}
        />
        <label
          onClick={(e) => e.stopPropagation()}
          htmlFor={id || inputId}
        />
        <span />
      </div>
    </div>
  );
};
