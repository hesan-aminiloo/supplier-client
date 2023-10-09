import { FormInput, Icon, Button } from '@src/components';
import Background from '@src/assets/images/resetBackground.png';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';
import { coreStore } from '@src/store/core';
import { Navigate, Link } from 'react-router-dom';
import { HOME_PAGE_PATH, REQUESTS_PAGE_PATH } from '@src/utils';
import { useForgotPassword } from './ForgotPassword.tools';

import styles from './ForgotPassword.module.scss';
import { ForgotPasswordFormStateEnums } from './ForgotPassword.types';
import { RESET_PASSWORD_TIMEOUT } from './ForgotPassword.constants';

export const ForgotPassword = () => {
  const { token } = useStore(coreStore);

  const { t } = useTranslation();
  const { methods, onSubmit, isLoading, formState } = useForgotPassword();

  const [secondsLeft, setSecondsLeft] = useState<number>(RESET_PASSWORD_TIMEOUT);

  useEffect(() => {
    let timer: NodeJS.Timer;

    if (formState === ForgotPasswordFormStateEnums.RESET_LINK_SENT) {
      timer = setInterval(() => {
        if (secondsLeft !== 0) setSecondsLeft((seconds) => seconds - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [secondsLeft, formState]);

  const handleResendEmail = () => {
    methods.handleSubmit(onSubmit)();
    setSecondsLeft(RESET_PASSWORD_TIMEOUT);
  };

  if (token) {
    return (
      <Navigate
        to={REQUESTS_PAGE_PATH}
        replace
      />
    );
  }

  return (
    <FormProvider {...methods}>
      {formState === ForgotPasswordFormStateEnums.EMAIL_INPUT ? (
        <div
          style={{ backgroundImage: `url(${Background})` }}
          className="h-screen flex justify-end items-center pr-[12%] bg-cover"
        >
          <div
            className={clsx(
              styles['forgot-password__forgot-password'],
              'p-6 h-max border gap-y-3 border-stroke-4 flex flex-col justify-between rounded-xl bg-white'
            )}
          >
            <Link
              to={HOME_PAGE_PATH}
              className="w-max"
            >
              <Button
                variant="tertiary"
                className="w-10 h-10 p-0 flex items-center justify-center"
                leftIcon={
                  <Icon
                    name="arrow-left"
                    size="sm"
                  />
                }
              />
            </Link>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <p className="bolder text-2xl mb-1 text-neutral-700">{t('forgot_password.forgot_your_password')}</p>
              <p className="bold text-sm text-neutral-500">{t('forgot_password.in_order_to_reset_your_password')}</p>
              <div className="mb-3 mt-6">
                <FormInput
                  leftIcon={
                    <Icon
                      name="sms"
                      size="sm"
                    />
                  }
                  control={methods.control}
                  label={t('shared.forms.email')}
                  id="email-input"
                  name="email"
                  placeholder={t('placeholders.email_address')}
                  disabled={isLoading}
                  fullWidth
                />
              </div>
              <Button
                fullWidth
                type="submit"
                variant="solid"
                color="primary"
                className="mt-2.5"
                disabled={isLoading}
              >
                {isLoading ? t('shared.loading') : t('forgot_password.reset_password')}
              </Button>
            </form>
          </div>
        </div>
      ) : null}
      {formState === ForgotPasswordFormStateEnums.RESET_LINK_SENT ? (
        <div
          style={{ backgroundImage: `url(${Background})` }}
          className="h-screen flex justify-end items-center pr-[12%] bg-cover"
        >
          <div
            className={clsx(
              styles['forgot-password__forgot-password'],
              'p-6 h-max border gap-y-3 border-stroke-4 flex flex-col justify-between rounded-xl bg-white'
            )}
          >
            <p className="text-3xl bold">{t('reset.reset_pass.title')}</p>
            <p className="text-neutral-500">{t('reset.reset_pass.description')}</p>
            <div className="flex items-center w-full justify-between">
              <p className="text-neutral-500">{t('reset.reset_pass.have_received')}</p>
              <Button
                variant="tertiary"
                onClick={handleResendEmail}
                disabled={!!secondsLeft}
                className={clsx(styles['forgot-password__resend-button'], 'h-11')}
              >
                {t('reset.reset_pass.resend')}
                {secondsLeft > 0 && <span className="mx-2 text-neutral-700">{secondsLeft}</span>}
              </Button>
            </div>
            <Link
              to={HOME_PAGE_PATH}
              className="mt-6"
            >
              <Button fullWidth>{t('reset.reset_pass.thank_you')}</Button>
            </Link>
          </div>
        </div>
      ) : null}
    </FormProvider>
  );
};
