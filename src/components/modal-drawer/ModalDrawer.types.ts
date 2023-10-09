import { PortalProps } from '@src/components/portal';
import { CSSProperties, ComponentPropsWithoutRef, ReactNode, RefObject } from 'react';

export type Type = 'modal' | 'drawer';

export enum DrawerPlacement {
  Left = 'left',
  Right = 'right',
  Top = 'top',
  Bottom = 'bottom',
  Center = 'Center',
}

export enum DefaultSize {
  Width = 28,
}

export type ModalDrawerProps = ComponentPropsWithoutRef<'div'> &
  Pick<PortalProps, 'target'> & {
    type: Type;
    backdrop?: boolean;
    backdropClassName?: string;
    bodyClassName?: string;
    contentClassName?: string;
    backdropStyle?: CSSProperties;
    backdropColor?: string;
    children: ReactNode;
    isFullHeight?: boolean;
    isOpen?: boolean;
    shouldBackdropClose?: boolean;
    escClose?: boolean;
    placement?: DrawerPlacement;
    width?: number;
    onClosed?: () => void;
    onOpened?: () => void;
  };

export type ModalDrawerRef = RefObject<ModalDrawerProps>;
