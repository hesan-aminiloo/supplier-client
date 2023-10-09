/* eslint-disable react-hooks/exhaustive-deps */
import { useKeyPress } from '@src/utils';
import clsx from 'clsx';
import { Backdrop } from '@src/components/backdrop';
import { Portal } from '@src/components/portal';
import { RefAttributes, forwardRef, useEffect, useId, useImperativeHandle, useState } from 'react';
import { Colors } from '@src/style/helpers/variables/colors';

import { DefaultSize, DrawerPlacement, ModalDrawerProps, ModalDrawerRef } from './ModalDrawer.types';
import styles from './ModalDrawer.module.scss';

// TODO: write unit tests...
export const ModalDrawer = forwardRef<RefAttributes<ModalDrawerRef>, ModalDrawerProps>((props, ref) => {
  const {
    type,
    target,
    backdrop = true,
    backdropClassName = '',
    contentClassName = '',
    backdropStyle,
    backdropColor = Colors.gray900,
    children,
    isFullHeight = false,
    isOpen = false,
    shouldBackdropClose = true,
    escClose = true,
    onClosed,
    onOpened,
    placement = DrawerPlacement.Right,
    width = DefaultSize.Width,
    ...restProps
  } = props;
  const [isOpenState, setIsOpenState] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(isOpen);
  const uuid: string = useId();
  const id: string = restProps.id || `${type}-${uuid}`;
  const backdropId: string = restProps.id ? `${restProps.id}-backdrop` : `${type}-backdrop-${uuid}`;

  const size =
    type === 'drawer' && (placement === DrawerPlacement.Right || placement === DrawerPlacement.Left)
      ? { width: `${width}%` }
      : {};

  const dataPlacement = type === 'drawer' ? { 'data-placement': placement } : {};

  const handleClose = (): void => {
    setIsActive(false);
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
  };

  const handleShouldBackdropClose = () => {
    // eslint-disable-next-line no-unused-expressions
    shouldBackdropClose && handleClose();
  };

  const removeFromDOM = () => {
    if (!isActive) {
      setIsOpenState(false);
      onClosed?.();
    }
  };

  useKeyPress(handleClose, ['escape'], !escClose);

  const handleOpen = () => {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    setIsOpenState(true);
    setIsActive(true);
    onOpened?.();
  };

  useImperativeHandle(ref, (): object => {
    return {
      ...props,
      id,
      backdropId,
      open: handleOpen,
      close: handleClose,
    };
  });

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    isOpen !== isOpenState && (isOpen ? handleOpen() : handleClose());
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    };
  }, []);

  return (
    <Portal target={target}>
      <div className={`${isOpenState ? 'd-block' : 'd-none'}`}>
        {backdrop && (
          <Backdrop
            className={backdropClassName}
            style={backdropStyle}
            color={backdropColor}
            id={backdropId}
            isActive={isActive}
            onClick={handleShouldBackdropClose}
          />
        )}
        <div
          {...restProps}
          role="dialog"
          aria-modal={isActive}
          id={id}
          className={clsx(
            'flex flex-col fixed',
            styles['modal-drawer'],
            styles[`modal-drawer__${type}`],
            {
              [styles[`drawer--${placement}`]]: type === 'drawer',
              [styles['modal-drawer--open']]: isActive,
              [styles['modal-drawer--full-height']]:
                type === 'modal'
                  ? isFullHeight
                  : isFullHeight && (placement === DrawerPlacement.Bottom || placement === DrawerPlacement.Top),
            },
            restProps.className
          )}
          style={{ ...restProps.style, ...size }}
          onTransitionEnd={removeFromDOM}
          data-testid={type}
          {...dataPlacement}
        >
          <div
            className={clsx(styles['modal-drawer__body'], 'overflow-auto', restProps.bodyClassName)}
            data-testid="body"
          >
            <div className={clsx(styles['modal-drawer__content'], 'flex flex-col h-full', contentClassName)}>
              {isOpen ? children : null}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
});
