import { Icon } from '@src/components';
import { Theme } from '@src/style';
import { toast, CloseButtonProps } from 'react-toastify';

import { ToastProps } from './toast.types';

export const CloseButton = ({ closeToast }: CloseButtonProps) => (
  <button
    type="button"
    onClick={closeToast}
  >
    <Icon
      name="close"
      size="md"
      color={Theme.colors.white}
    />
  </button>
);

export const warningToast = ({ message }: ToastProps) => {
  toast(message, {
    type: 'warning',
    icon: (
      <Icon
        name="warning-2"
        size="md"
        color={Theme.colors.white}
      />
    ),
  });
};

export const errorToast = ({ message }: ToastProps) => {
  toast(message, {
    type: 'error',
    icon: (
      <Icon
        name="danger"
        size="md"
        color={Theme.colors.white}
      />
    ),
  });
};

export const successToast = ({ message }: ToastProps) => {
  toast(message, {
    type: 'success',
    icon: (
      <Icon
        name="tick-circle"
        size="md"
        color={Theme.colors.white}
      />
    ),
  });
};

export const defaultToast = ({ message }: ToastProps) => {
  toast(message, {
    type: 'default',
  });
};
