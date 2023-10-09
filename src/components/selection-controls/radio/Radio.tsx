/* eslint-disable jsx-a11y/label-has-associated-control */
import clsx from 'clsx';
import { FC, ForwardRefRenderFunction, forwardRef, useId } from 'react';

import { RadioProps } from './Radio.types';
import styles from './Radio.module.scss';

const ForwardedRefBase: ForwardRefRenderFunction<HTMLInputElement, RadioProps> = (
  { label, id, name, disabled, className, size = 'md', ...restProps },
  ref
) => {
  const inputId = useId();
  const radioItem = (
    <div className={clsx(styles[`radio-wrapper--${size}`], className)}>
      <input
        {...restProps}
        type="radio"
        id={inputId || id}
        name={name}
        disabled={disabled}
        ref={ref}
      />
      <label htmlFor={inputId || id} />
    </div>
  );
  if (!label) return radioItem;
  return (
    <div className={clsx(styles['radio-with-label'], className)}>
      {radioItem}
      <label htmlFor={inputId || id}>{label}</label>
    </div>
  );
};
export const Radio: FC<RadioProps> = forwardRef(ForwardedRefBase);
