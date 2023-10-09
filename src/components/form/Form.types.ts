import { ObjectType } from '@src/types';
import { PropsWithChildren } from 'react';
import { SubmitHandler, UseFormProps } from 'react-hook-form';

export type FormProps<T extends ObjectType> = PropsWithChildren<
  UseFormProps<T, object> & {
    onSubmit: SubmitHandler<T>;
    className?: string;
  }
>;
