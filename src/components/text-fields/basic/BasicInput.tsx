import { ForwardRefRenderFunction, KeyboardEvent, forwardRef } from 'react';

// Utils
import clsx from 'clsx';

// Types
import { BasicInputProps } from './BasicInput.types';

import styles from './BasicInput.module.scss';

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, BasicInputProps> = (props, ref) => {
  const { className, onSubmit, onKeyUp, onInput, ...restProps } = props;

  const handleOnChange = (e: KeyboardEvent<HTMLInputElement>) => {
    onInput?.(e);
  };

  const handleKeyUp: BasicInputProps['onKeyUp'] = (e) => {
    onKeyUp?.(e);
    if (onSubmit && (e.keyCode === 13 || e.key === 'NumpadEnter')) {
      const target = e?.target as HTMLInputElement;
      onSubmit?.(target.value);
    }
  };

  return (
    <input
      type="text"
      autoComplete="off"
      onInput={handleOnChange}
      onKeyUp={handleKeyUp}
      className={clsx(styles.input, className)}
      ref={ref}
      {...restProps}
    />
  );
};

export const BasicInput = forwardRef(InputComponent);
