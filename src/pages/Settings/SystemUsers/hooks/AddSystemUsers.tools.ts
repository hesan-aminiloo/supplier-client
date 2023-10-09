import { Dispatch, SetStateAction, useState } from 'react';
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
import { formInitialValues as defaultValues } from '../components/Form/Form.constants';

export const systemUserSchema = object({
  firstName: string().required(i18next.t('shared.validation.firstName_required')),
  phone: string(),
  avatar: mixed(),
  role: string().required(i18next.t('shared.validation.role_required')),
  email: string()
    .required(i18next.t('shared.validation.email_required'))
    .matches(emailRegex, { message: i18next.t('shared.validation.email_invalid') }),
  lastName: string().required(i18next.t('shared.validation.lastName_required')),
  username: string().required(i18next.t('shared.validation.userName_required')),
  branch: array().of(number()).min(1, i18next.t('shared.validation.branch_required')),
  password: string()
    .required(i18next.t('shared.validation.password_required'))
    .matches(passwordRegex, { message: i18next.t('shared.validation.password_invalid') }),
  password_confirmation: string()
    .required(i18next.t('shared.validation.password_required'))
    .oneOf([ref('password'), null], i18next.t('shared.validation.password_match')),
  addCustomersPermission: boolean(),
});

interface SystemUsersFormProps {
  onClose: () => void;
  getSystemUsersList: () => void;
  setFilePreview: Dispatch<SetStateAction<string>>;
}

export const useSystemUsersForm = ({ onClose, getSystemUsersList, setFilePreview }: SystemUsersFormProps) => {
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const methods = useForm({
    resolver: yupResolver(systemUserSchema),
    mode: 'onChange',
    defaultValues,
  });
  const onSubmit: FormProps<UserData>['onSubmit'] = (fields) => {
    const formData = new FormData();
    formData.append('email', fields.email);
    formData.append('password', fields.password);
    formData.append('phone', fields.phone);
    formData.append('firstName', fields.firstName);
    formData.append('lastName', fields.lastName);
    formData.append('role', fields.role);
    formData.append('username', fields.username);
    formData.append('avatar', fields.avatar);
    formData.append('addCustomersPermission', JSON.stringify(fields.addCustomersPermission ? 1 : 0));

    fields.branch?.map((branch) => formData.append(`branch[]`, `${branch}`));
    formData.append('password_confirmation', fields.password_confirmation);
    if (fields.avatar && typeof fields.avatar === 'object') {
      formData.append('avatar', fields.avatar);
    }

    setIsLoading(true);
    setIsLoading(false);
    axios
      .post('system/user', formData)
      .then((data) => {
        setResult(data); // Do whatever you want with this result object
        setIsLoading(false);
        setHasError(false);
        successToast({ message: i18next.t('settings.system_users.user_added') });
        onClose();
        getSystemUsersList();
        methods.reset();
        setFilePreview('');
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
