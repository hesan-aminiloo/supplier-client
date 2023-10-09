/* eslint-disable react/no-array-index-key */
import clsx from 'clsx';
import { ForwardRefRenderFunction, SyntheticEvent, cloneElement, forwardRef } from 'react';

import { RadioGroupProps } from './RadioGroup.types';
import styles from './RadioGroup.module.scss';

const ForwardedRefBase: ForwardRefRenderFunction<HTMLDivElement, RadioGroupProps> = (
  { children, name, onChange, className, vertical = false, helperText, state, ...restProps },
  ref
) => {
  const handleOnChangeValue = (evt: SyntheticEvent) => {
    const input = evt.target as HTMLInputElement;
    onChange?.(input.value);
  };
  return (
    <>
      <div
        {...restProps}
        onChange={handleOnChangeValue}
        className={clsx(styles.group, className, { [styles['group--vertical']]: vertical })}
        ref={ref}
        role="radiogroup"
      >
        {name ? children?.map((element, i) => cloneElement(element, { name, key: `:r-${i}` })) : children}
        {!!helperText && (
          <span
            className={clsx('absolute inline-block pt-2 text-neutral-500 font-normal text-xs', {
              'text-destructive-500': !!state && state !== 'none',
            })}
          >
            {helperText}
          </span>
        )}
      </div>
    </>
  );
};
export const RadioGroup = forwardRef(ForwardedRefBase);
