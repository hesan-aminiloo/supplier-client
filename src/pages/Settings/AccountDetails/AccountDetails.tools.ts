import { yupResolver } from '@hookform/resolvers/yup';
import { FormProps } from '@src/components';
import axios from 'axios';
import { emailRegex, phoneRegex, successToast } from '@src/utils';
import { useState } from 'react';
import i18next from 'i18next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useStore } from 'zustand';
import { coreStore } from '@src/store/core';
import { setErrorsInForm } from '@src/utils/error-handling';
import { SubmitDataType } from './AccountDetails.types';

export const AccountDetailsSchema = () => {
  const { t } = useTranslation();
  return yup.object().shape(
    {
      avatar: yup.mixed(),
      firstName: yup.string().required(t('shared.validation.firstName_required')),
      lastName: yup.string().required(t('shared.validation.lastName_required')),
      username: yup.string().required(t('shared.validation.userName_required')),
      phone: yup
        .string()
        .nullable()
        .matches(phoneRegex, { message: t('shared.validation.phone_invalid') }),
      role: yup.string().required(t('shared.validation.role_required')),
      email: yup
        .string()
        .required(t('shared.validation.email_required'))
        .matches(emailRegex, { message: t('shared.validation.email_invalid') }),
      branch: yup.string().required(t('shared.validation.branch_required')),
      currentPassword: yup.string().when('password', {
        // TODO: Replace any
        is: (value: string | any[]) => value?.length && value,
        then: (rule) =>
          rule.required(t('shared.forms.password_is_required')).min(8, t('shared.validation.password_min')),
      }),
      password: yup.string().when('currentPassword', {
        // TODO: Replace any
        is: (value: string | any[]) => value?.length && value,
        then: (rule) =>
          rule.required(t('shared.forms.password_is_required')).min(8, t('shared.validation.password_min')),
      }),
      password_confirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], t('shared.validation.password_match'))
        .when('currentPassword', {
          // TODO: Replace any
          is: (value: string | any[]) => value?.length && value,
          then: (rule) =>
            rule.required(t('shared.forms.password_is_required')).min(8, t('shared.validation.password_min')),
        }),
    },
    [['currentPassword', 'password']]
  );
};

export const useAccountDetailsForm = () => {
  const [result, setResult] = useState<SubmitDataType | null>(null);
  const { user, setUser, token, permissions, countries } = useStore(coreStore);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const defaultValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    phone: user?.phone || '',
    branch: user?.branch[0]?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    role: user?.role || '',
    currentPassword: '',
    password: '',
    password_confirmation: '',
  };

  const methods = useForm({
    resolver: yupResolver(AccountDetailsSchema()),
    mode: 'onChange',
    defaultValues,
  });

  const clearPasswordFields = () => {
    methods.setValue('password', '');
    methods.setValue('password_confirmation', '');
    methods.setValue('currentPassword', '');
  };

  const onSubmit: FormProps<SubmitDataType>['onSubmit'] = (fields) => {
    const formData = new FormData();
    const branchId = user?.branch[0]?.id || '';
    if (fields.avatar && typeof fields.avatar === 'object') {
      formData.append('avatar', fields.avatar);
    }
    formData.append('_method', 'put');
    formData.append('firstName', fields.firstName);
    formData.append('lastName', fields.lastName);
    formData.append('username', fields.username);
    formData.append('phone', fields.phone);
    formData.append('email', fields.email);
    formData.append('role', fields.role);
    formData.append('branch[]', branchId as string);
    formData.append('currentPassword', fields.currentPassword);
    if (!!fields.password && !!fields.password_confirmation) {
      formData.append('password', fields.password);
      formData.append('password_confirmation', fields.password_confirmation);
    }
    setIsLoading(true);
    axios
      .post(`system/user/${user?.id}`, formData)
      .then((res) => {
        successToast({ message: i18next.t('shared.validation.user_updated') });
        const data = res as unknown as SubmitDataType;
        const userInfo = res.data.user;
        setUser({ user: userInfo, token, permissions, countries });
        setResult(data);
        setIsLoading(false);
        setHasError(false);
        clearPasswordFields();
      })
      .catch((err) => {
        setErrorsInForm(JSON.parse(err.response.data).errors, methods.setError);
        setHasError(true);
        setIsLoading(false);
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
