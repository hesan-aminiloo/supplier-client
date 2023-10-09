import { yupResolver } from '@hookform/resolvers/yup';
import { FormProps } from '@src/components';
import { passwordRegex, customFetcher, getQueryParams, LOGOUT_PAGE_PATH, successToast } from '@src/utils';
import i18next from 'i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { INewPasswordDto } from '@src/types';
import { NewPasswordFormData } from './NewPassword.types';

export const newPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required(i18next.t('shared.validation.password_required'))
    .matches(passwordRegex, { message: i18next.t('shared.validation.password_invalid') })
    .min(8),
  password_confirmation: yup
    .string()
    .required(i18next.t('shared.validation.password_required'))
    .oneOf([yup.ref('password'), null], i18next.t('shared.validation.password_match')),
});

const defaultValues = {
  password: '',
  password_confirmation: '',
  token: '',
  email: '',
};

export const useNewPasswordForm = () => {
  const [result, setResult] = useState<INewPasswordDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const queryParams = getQueryParams();
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(newPasswordSchema),
    mode: 'onChange',
    defaultValues,
  });

  const onSubmit: FormProps<NewPasswordFormData>['onSubmit'] = (fields) => {
    const formData = new FormData();
    formData.append('password', fields.password);
    formData.append('password_confirmation', fields.password_confirmation);

    setIsLoading(true);
    setIsLoading(false);
    customFetcher<INewPasswordDto>('new-password', {
      method: 'POST',
      body: JSON.stringify({ ...fields, email: queryParams.email, token: queryParams.token }),
    })
      .then(({ data }) => {
        setResult(data);
        setIsLoading(false);
        setHasError(false);
        successToast({ message: i18next.t('shared.validation.password_success') });
        navigate(LOGOUT_PAGE_PATH, { replace: true });
      })
      .catch((err) => {
        console.error(err, 'errrr');
        setHasError(true);
        setIsLoading(false);
        navigate(LOGOUT_PAGE_PATH, { replace: true });
      });
  };

  return {
    methods,
    onSubmit,
    isLoading,
    hasError,
    result,
  };
};
