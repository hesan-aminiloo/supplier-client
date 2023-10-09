/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ForwardRefRenderFunction, RefObject, forwardRef, useRef, useState, SyntheticEvent, useEffect } from 'react';

// Utils
import clsx from 'clsx';

// Components
import { Icon } from '@src/components/icon';
import { Theme } from '@src/style';
import { Input } from '../input';

// Types
import { DropDownProps } from './DropDown.types';

// Styles
import styles from './DropDown.module.scss';

const RightIcon = ({ isOpen, onClick }: { onClick?: (e: SyntheticEvent) => void; isOpen?: boolean }) => (
  <button
    className="w-full h-full"
    onClick={onClick}
  >
    <Icon
      name={isOpen ? 'arrow-up-2' : 'arrow-down-1'}
      color={Theme.colors.neutral500}
      className="m-auto"
      size="sm"
    />
  </button>
);

const ForwardedRefBase: ForwardRefRenderFunction<HTMLTextAreaElement, DropDownProps> = (
  {
    id,
    hideRightIcon,
    contentClassNames,
    className,
    deviceType = 'desktop',
    delay,
    open,
    type,
    children,
    ...restProps
  },
  ref
) => {
  const theRef: RefObject<HTMLInputElement> = useRef(null);
  const inputElementRef = (ref ?? theRef) as RefObject<HTMLInputElement>;
  const dropDownElementRef = useRef<HTMLDivElement>(null);
  const [isFocused, setFocused] = useState(false);
  const isOpen = open === undefined ? isFocused : open;

  const dropDownContent = (
    <div
      className={clsx(styles[`drop-down--${deviceType}`], contentClassNames, {
        [styles[`drop-down--${deviceType}--open`]]: isOpen,
      })}
      style={{ transitionDelay: delay }}
    >
      <div className={clsx(styles['content-wrapper'], 'shadow-lg rounded-xl bg-white p-2 border border-stroke-4')}>
        {children}
      </div>
    </div>
  );

  const handleClickInside = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (!target.matches('button')) {
      setFocused(!isFocused);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropDownElementRef.current && !dropDownElementRef.current.contains(event.target as Node)) {
      setFocused(false);
    }
  };

  useEffect(() => {
    if (type !== 'multi-select') {
      setFocused(false);
    }
  }, [restProps.value, type]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropDownElementRef}
      className={clsx('w-full', className)}
    >
      <div className={styles.wrapper}>
        <div onClick={handleClickInside}>
          <Input
            {...restProps}
            id={id}
            onKeyDown={(evt) => evt.preventDefault()}
            placeholder={restProps.placeholder ?? ' '}
            ref={inputElementRef}
            type="text"
            data-testid={`${id}-input`}
            rightIcon={
              hideRightIcon ? null : (
                <RightIcon
                  onClick={handleClickInside}
                  isOpen={isOpen}
                />
              )
            }
          />
        </div>

        {dropDownContent}
      </div>
    </div>
  );
};

export const DropDown = forwardRef(ForwardedRefBase);
