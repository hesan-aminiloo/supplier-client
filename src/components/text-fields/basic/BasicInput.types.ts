import { ComponentPropsWithRef } from 'react';

export type BasicInputProps = Omit<ComponentPropsWithRef<'input'>, 'onSubmit'> & {
  onSubmit?: (text: string) => void;
};
