/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import clsx from 'clsx';
import { FC, ForwardRefRenderFunction, SyntheticEvent, forwardRef, useId } from 'react';

import { CheckboxProps } from './Checkbox.types';
import styles from './Checkbox.module.scss';

const ForwardedRefBase: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
  { label, id, onChange, onClick, name, disabled, className, size = 'lg', ...restProps },
  ref
) => {
  const inputId = useId();
  const handleChangeCheckBox = (evt: SyntheticEvent) => {
    const target = evt.target as HTMLInputElement;
    onChange?.(Boolean(target.checked));
  };
  const checkboxItem = (
    <div className={clsx(styles[`checkbox-wrapper--${size}`], className)}>
      <input
        {...restProps}
        onChange={handleChangeCheckBox}
        type="checkbox"
        id={inputId || id}
        name={name}
        disabled={disabled}
        ref={ref}
        onClick={onClick}
      />
      <label
        onClick={(e) => e.stopPropagation()}
        htmlFor={inputId || id}
      />
      <span />
    </div>
  );
  if (!label) return checkboxItem;
  return (
    <div className={styles['checkbox-with-label']}>
      {checkboxItem}
      <label htmlFor={inputId || id}>{label}</label>
    </div>
  );
};
export const Checkbox: FC<CheckboxProps> = forwardRef(ForwardedRefBase);
