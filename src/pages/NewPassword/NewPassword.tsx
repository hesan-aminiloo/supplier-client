import Background from '@src/assets/images/newPassBackground.png';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FormProvider } from 'react-hook-form';
import { FormPassword, Button, Icon } from '@src/components';
import clsx from 'clsx';
import { getQueryParams } from '@src/utils';
import { useNewPasswordForm } from './NewPassword.tools';
import styles from './NewPassword.module.scss';
import { HAS_NO_ERROR } from './NewPassword.constants';

export const NewPassword = () => {
  const { t } = useTranslation();
  const queryString = getQueryParams();
  const { methods, onSubmit, isLoading, result } = useNewPasswordForm();

  return (
    <div
      style={{ backgroundImage: `url(${Background})` }}
      className="h-screen flex justify-end items-center pr-[12%] bg-cover"
    >
      {queryString.error === HAS_NO_ERROR ? (
        <FormProvider {...methods}>
          {!result ? (
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className={clsx(
                styles['new-password__form'],
                'p-6 h-max border gap-y-6 border-stroke-4 flex flex-col justify-between rounded-xl bg-white'
              )}
            >
              <>
                <div className="flex flex-col gap-1">
                  <p className="bold text-2xl">{t('create_pass.create_new_password')}</p>
                  <p className="text-sm text-neutral-500">{t('create_pass.description')}</p>
                </div>
                <div>
                  <FormPassword
                    label={t('shared.forms.password')}
                    leftIcon={
                      <Icon
                        name="lock-1"
                        size="sm"
                      />
                    }
                    name="password"
                    id="password-input"
                    control={methods.control}
                    placeholder={t('placeholders.password')}
                    fullWidth
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <FormPassword
                    label={t('create_pass.confirm_password')}
                    leftIcon={
                      <Icon
                        name="lock-1"
                        size="sm"
                      />
                    }
                    name="password_confirmation"
                    id="password_confirmation-input"
                    control={methods.control}
                    placeholder={t('placeholders.password')}
                    fullWidth
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit">{t('create_pass.submit')}</Button>
              </>
            </form>
          ) : null}
          {result ? (
            <>
              <p className="bold text-2xl">{t('create_pass.password_reset')}</p>
              <p className="text-sm text-neutral-500">{t('create_pass.reset_success')}</p>
              <Link to="/">
                <Button>{t('reset.reset_pass.thank_you')}</Button>
              </Link>
            </>
          ) : null}
        </FormProvider>
      ) : null}
      {queryString.error !== HAS_NO_ERROR ? (
        <div
          className={clsx(
            styles['resend-password__box'],
            'p-6  h-max border gap-y-6 border-stroke-4 flex flex-col justify-between rounded-xl bg-white'
          )}
        >
          {t('create_pass.your_token_has_expired')}
        </div>
      ) : null}
    </div>
  );
};

export default NewPassword;
