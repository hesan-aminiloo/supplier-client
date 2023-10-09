import { FC, MouseEvent } from 'react';

// Utils
import clsx from 'clsx';

// Types
import { IButtonProps, ButtonRadius } from './Button.types';
import { BUTTON_COLORS, BUTTON_SIZES } from './Button.constants';

export const Button: FC<IButtonProps> = ({
  loading = false,
  size = 'md',
  isClickableOnDisabled,
  fullWidth,
  variant = 'solid',
  color = 'primary',
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  className,
  onClick,
}) => {
  const handleClick = (e: MouseEvent) => {
    if (!onClick) return false;
    if (disabled && !isClickableOnDisabled) return false;
    if (onClick) {
      onClick(e);
    }
    return false;
  };

  return (
    <button
      disabled={disabled}
      style={{ borderRadius: ButtonRadius[size] }}
      onClick={handleClick}
      className={clsx(
        'border transition-colors',
        BUTTON_SIZES[size],
        BUTTON_COLORS[variant][color],
        className,
        fullWidth && 'w-full'
      )}
    >
      {leftIcon && leftIcon}
      {/* TODO: Replace loading for a spinner */}
      {loading && <span>Loading...</span>}
      {!loading && children}
      {rightIcon && rightIcon}
    </button>
  );
};

export default Button;
