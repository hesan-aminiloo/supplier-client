/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FormProvider } from 'react-hook-form';
import { FormPassword, FormInput, Button, Icon } from '@src/components';
import { AuthLayout } from '@src/layouts/Auth/Auth';
import { FORGET_PASSWORD_PATH, REQUESTS_PAGE_PATH } from '@src/utils';
import { useStore } from 'zustand';
import { coreStore } from '@src/store/core';
import { useLoginForm } from './Login.tools';

export const Login = () => {
  const { t } = useTranslation();
  const { methods, onSubmit, isLoading } = useLoginForm();
  const { token } = useStore(coreStore);

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onSubmit(methods.getValues(), event);
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  if (token) {
    return (
      <Navigate
        to={REQUESTS_PAGE_PATH}
        replace
      />
    );
  }

  return (
    <AuthLayout>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <p className="bolder text-6xl text-primary-800 mb-2">{t('login.hi')}</p>
          <p className="bold text-2xl text-neutral-700 mb-6">{t('login.login_to_account')}</p>
          <div className="my-4">
            <FormInput
              leftIcon={
                <Icon
                  name="user"
                  size="sm"
                />
              }
              control={methods.control}
              label={t('login.user')}
              id="email-input"
              name="email"
              placeholder={t('login.sample_email')}
              disabled={isLoading}
              fullWidth
            />
          </div>
          <div className="my-4">
            <FormPassword
              label={t('login.password')}
              leftIcon={
                <Icon
                  name="lock-1"
                  size="sm"
                />
              }
              control={methods.control}
              id="password-input"
              name="password"
              placeholder={t('shared.forms.password')}
              disabled={isLoading}
              fullWidth
            />
          </div>
          <Button
            fullWidth
            type="submit"
            variant="solid"
            color="primary"
            className="mt-4"
            disabled={isLoading}
          >
            {isLoading ? t('shared.loading') : t('login.login')}
          </Button>
          <Link to={FORGET_PASSWORD_PATH}>
            <p className="mt-7 mb-5 text-center text-neutral-500">{t('login.forgot_password')}</p>
          </Link>
        </form>
      </FormProvider>
    </AuthLayout>
  );
};

export default Login;
