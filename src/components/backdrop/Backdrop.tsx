/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx';
import { FC, useEffect, useId, useState } from 'react';
import { Colors } from '@src/style/helpers/variables/colors';

import { BackdropProps } from './Backdrop.types';
import styles from './Backdrop.module.scss';

export const Backdrop: FC<BackdropProps> = (props) => {
  const { color = Colors.gray900, isActive, isFixed = true, onClick, ...restProps } = props;
  const uuid: string = useId();
  const backdropId: string = restProps.id || `backdrop-${uuid}`;
  const [isOpenState, setIsOpenState] = useState<boolean>(false);
  const [activeState, setActiveState] = useState<boolean>(isActive);

  const backdropClassName = {
    [styles['backdrop--open']]: activeState,
    [styles['backdrop--fixed']]: isFixed,
    [styles['backdrop--absolute']]: !isFixed,
  };

  const handleClick = () => onClick?.();

  const handleClose = (): void => {
    setActiveState(false);
  };

  const handleOpen = () => {
    setIsOpenState(true);
    setActiveState(true);
  };

  const removeFromDOM = () => {
    if (!activeState) {
      setIsOpenState(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    isActive !== isOpenState && (isActive ? handleOpen() : handleClose());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  if (!isOpenState) return null;

  return (
    <div
      {...restProps}
      id={backdropId}
      style={{ ...restProps.style, backgroundColor: color }}
      className={clsx(styles.backdrop, restProps.className, backdropClassName)}
      onClick={handleClick}
      data-opened={isActive}
      onTransitionEnd={removeFromDOM}
    />
  );
};
