import { yupResolver } from '@hookform/resolvers/yup';
import { FormProps } from '@src/components';
import { customFetcher, emailRegex, errorToast } from '@src/utils';
import i18next from '@src/app/localization/i18n';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ForgotPasswordFormData, ForgotPasswordFormState, ForgotPasswordFormStateEnums } from './ForgotPassword.types';

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required(i18next.t('shared.validation.email_required'))
    .matches(emailRegex, { message: i18next.t('shared.validation.email_invalid') }),
});

export const forgotPasswordFormDefaultValues = { email: '' };

export const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [formState, setFormState] = useState<ForgotPasswordFormState>('email_input');

  const methods = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'onSubmit',
    defaultValues: forgotPasswordFormDefaultValues,
  });

  const onSubmit: FormProps<ForgotPasswordFormData>['onSubmit'] = (fields) => {
    setIsLoading(true);
    customFetcher<{ message: string }>('forgot-password', {
      method: 'POST',
      body: JSON.stringify({ ...fields }),
    })
      .then(() => {
        setFormState(ForgotPasswordFormStateEnums.RESET_LINK_SENT);
        setIsLoading(false);
        setHasError(false);
      })
      .catch((err) => {
        console.error(err.message);
        errorToast({ message: i18next.t('shared.validation.email_incorrect') });
        setHasError(true);
        setIsLoading(false);
      });
  };

  return {
    methods,
    onSubmit,
    isLoading,
    hasError,
    formState,
  };
};
