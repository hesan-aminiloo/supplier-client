import {
  forwardRef,
  ForwardRefRenderFunction,
  useRef,
  useId,
  RefObject,
  ChangeEvent,
  useState,
  useEffect,
} from 'react';

// Utils
import clsx from 'clsx';

import { InputProps } from './Input.types';
import { BasicInput } from '../basic';

import styles from './Input.module.scss';

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
  const theRef: RefObject<HTMLInputElement> = useRef(null);
  const {
    className,
    label,
    id,
    leftIcon = null,
    rightIcon = null,
    placeholder = '',
    helperText = '',
    fullWidth = false,
    disabled,
    error = '',
    status = 'none',
    onChange,
    labelClassName,
    inputClassName,
    ...restProps
  } = props;
  const inputId = useId();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = (ref ?? theRef) as RefObject<HTMLInputElement>;

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    onChange?.(evt.target.value);
  };

  useEffect(() => {
    const input = inputRef.current;
    input?.addEventListener('focusout', () => setIsFocused(false));
    input?.addEventListener('focus', () => setIsFocused(true));

    return () => {
      input?.removeEventListener('focusout', () => setIsFocused(false));
      input?.removeEventListener('focus', () => setIsFocused(true));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={clsx('relative', className)}>
      <label
        className={clsx('font-medium text-sm pb-1 inline-block', labelClassName)}
        htmlFor={id || inputId}
      >
        {label}
      </label>
      <div
        onFocus={restProps.onFocus}
        onBlur={restProps.onBlur}
        className={clsx(
          styles.wrapper,
          'transition-colors rounded-xl bg-white flex  items-center border border-neutral-200 shadow-xs relative h-11',
          {
            'w-full': fullWidth,
            'border !border-destructive-400': error,
            'border !border-primary-300': isFocused,
            [styles['wrapper--focused']]: isFocused,
            [styles['wrapper--error']]: error,
            [styles['wrapper--disabled']]: disabled,
          }
        )}
      >
        {leftIcon && (
          <button
            className="w-5 h-5 mx-3 z-0"
            tabIndex={-1}
          >
            {leftIcon}
          </button>
        )}
        <BasicInput
          ref={inputRef}
          id={id || inputId}
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleOnChange}
          className={clsx('absolute h-full  top-0 bottom-0 outline-none text-sm text-neutral-900', inputClassName, {
            'left-11': leftIcon,
            'left-3': !leftIcon,
            'right-11': rightIcon,
            'right-3': !rightIcon,
          })}
          {...restProps}
        />
        {rightIcon && (
          <div className="ml-3 absolute flex items-center justify-center top-0 bottom-0 right-0 w-10 cursor-pointer">
            {rightIcon}
          </div>
        )}
      </div>
      {!!helperText && status !== 'error' && (
        <span className="inline-block pt-2 text-neutral-500 font-normal text-xs">{helperText}</span>
      )}
      {status === 'error' && <span className="text-destructive-500 inline-block pt-2 text-xs">{error as string}</span>}
    </div>
  );
};

export const Input = forwardRef(InputComponent);
