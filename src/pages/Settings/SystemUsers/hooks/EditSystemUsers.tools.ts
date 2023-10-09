import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, boolean, mixed, number, object, ref, string } from 'yup';
import { emailRegex, passwordRegex } from '@src/utils/regex';
import { FormProps } from '@src/components';
import i18next from 'i18next';
import { successToast } from '@src/utils';
import { setErrorsInForm } from '@src/utils/error-handling';
import axios from 'axios';
import { UserData } from '../components/Form/Form.types';
import { BranchItemType } from '../../CompanyInfo/CompanyInfo.types';

export const systemUserSchema = object().shape(
  {
    firstName: string().required(i18next.t('shared.validation.firstName_required')),
    phone: string(),
    avatar: mixed(),
    email: string()
      .required(i18next.t('shared.validation.email_required'))
      .matches(emailRegex, { message: i18next.t('shared.validation.email_invalid') }),
    lastName: string().required(i18next.t('shared.validation.lastName_required')),
    username: string().required(i18next.t('shared.validation.userName_required')),
    branch: array().of(number()).min(1, i18next.t('shared.validation.branch_required')),
    password: string().when('password_confirmation', {
      // TODO: Replace any
      is: (value: string | any[]) => value?.length && value,
      then: (rule) =>
        rule
          .required(i18next.t('shared.forms.password_is_required'))
          .matches(passwordRegex, { message: i18next.t('shared.validation.password_invalid') }),
    }),
    password_confirmation: string()
      .oneOf([ref('password'), null], i18next.t('shared.validation.password_match'))
      .when('password', {
        // TODO: Replace any
        is: (value: string | any[]) => value?.length && value,
        then: (rule) =>
          rule
            .required(i18next.t('shared.forms.password_is_required'))
            .min(8, i18next.t('shared.validation.password_min')),
      }),
    addCustomersPermission: boolean(),
  },
  [['password_confirmation', 'password']]
);

export const useSystemUsersForm = (onClose: () => void, getSystemUsersList: () => void, userId: number, user: any) => {
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const methods = useForm({
    resolver: yupResolver(systemUserSchema),
    mode: 'all',
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone || '',
      email: user.email,
      avatar: user.avatar || '',
      username: user.username,
      role: user.role,
      branch: user.branch.map((branch: BranchItemType) => branch.id),
      password: '',
      password_confirmation: '',
      addCustomersPermission: !!user.addCustomersPermission,
    },
  });

  const onSubmit: FormProps<UserData>['onSubmit'] = (fields) => {
    const formData = new FormData();
    formData.append('_method', 'put');
    formData.append('email', fields.email);
    formData.append('password', fields.password);
    formData.append('role', fields.role);
    formData.append('phone', fields.phone);
    formData.append('firstName', fields.firstName);
    fields.branch?.map((branch) => formData.append(`branch[]`, `${branch}`));
    formData.append('lastName', fields.lastName);
    formData.append('username', fields.username);
    if (fields.avatar && typeof fields.avatar === 'object') {
      formData.append('avatar', fields.avatar);
    }
    formData.append('password_confirmation', fields.password_confirmation);
    formData.append('addCustomersPermission', JSON.stringify(fields.addCustomersPermission ? 1 : 0));
    setIsLoading(true);
    setIsLoading(false);
    axios
      .post(`system/user/${userId}`, formData)
      .then((data) => {
        setResult(data);
        setIsLoading(false);
        setHasError(false);
        successToast({ message: 'User Edited' });
        onClose();
        getSystemUsersList();
      })
      .catch((err) => {
        setErrorsInForm(err.response.data.errors, methods.setError);
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
