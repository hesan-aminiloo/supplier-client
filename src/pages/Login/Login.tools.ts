import { yupResolver } from '@hookform/resolvers/yup';
import * as PusherPushNotifications from '@pusher/push-notifications-web';
import { FormProps } from '@src/components';
import { ILoginDto } from '@src/types';
import { emailRegex, REQUESTS_PAGE_PATH } from '@src/utils';
import i18next from 'i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useStore } from 'zustand';
import { coreStore, ICoreStore } from '@src/store/core';
import { SITE_CONFIGS } from '@src/configs';
import { getLocalStorage, setLocalStorage } from '@utils/storage';
import axios from 'axios';
import { LoginFormData } from './Login.types';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required(i18next.t('shared.validation.email_required'))
    .matches(emailRegex, { message: i18next.t('shared.validation.email_invalid') }),
  password: yup.string().required(i18next.t('shared.validation.password_required')).min(8),
});

export const loginFormDefaultValues = { email: '', password: '' };

const getCountriesList = (store: ICoreStore) => {
  axios.get('/countries').then(({ data }) => {
    store.setCountries(data.countries);
  });
};

export const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const navigate = useNavigate();
  const store = useStore(coreStore);

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: loginFormDefaultValues,
  });
  const activeDeviceInterest = () => {
    axios.get('pusher-beams/set/device-interest/1');
  };

  const registerDevice = (room: string) => {
    const beamsClient = new PusherPushNotifications.Client({
      instanceId: SITE_CONFIGS.INSTANCE_ID,
    });
    beamsClient
      .start()
      .then(() => beamsClient.addDeviceInterest(room))
      .then(() => {
        console.log('Successfully registered and subscribed!');
        activeDeviceInterest();
      })
      .catch(console.error);
  };

  const onSubmit: FormProps<LoginFormData>['onSubmit'] = (fields) => {
    setIsLoading(true);
    axios
      .post('login', fields)
      .then(({ data }) => {
        const { user, token, permissions } = data as unknown as ILoginDto;
        setLocalStorage(SITE_CONFIGS.TOKEN_COOKIE_KEY!, token);
        store.setUser({ user, token, permissions });
        axios.defaults.headers.common.Authorization = `Bearer ${
          token || getLocalStorage(SITE_CONFIGS.TOKEN_COOKIE_KEY!)
        }`;

        getCountriesList(store);
        setIsLoading(false);
        setHasError(false);
        navigate(REQUESTS_PAGE_PATH, { replace: true });
        if (!user.isDeviceInterest) {
          registerDevice(user.room);
        }
      })
      .catch((err) => {
        methods.setError('password', {
          type: 'custom',
          message: err?.response?.data?.message ?? 'Something went wrong',
        });
        setHasError(true);
        setIsLoading(false);
      });
  };

  return {
    methods,
    onSubmit,
    isLoading,
    hasError,
  };
};
