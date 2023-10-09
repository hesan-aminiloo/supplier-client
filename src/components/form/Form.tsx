import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

// Types
import { ObjectType } from '@src/types';
import { FormProps } from './Form.types';

export function Form<T extends ObjectType>({
  onSubmit,
  children,
  className,
  ...useFormProps
}: Parameters<FC<FormProps<T>>>[0]): ReturnType<FC> {
  const methods = useForm({ ...useFormProps });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit as SubmitHandler<ObjectType>)}
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
}
