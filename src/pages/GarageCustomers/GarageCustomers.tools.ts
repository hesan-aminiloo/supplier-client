// TODO: Fix locales here
import i18next from '@src/app/localization/i18n';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  customFetcher,
  emailRegex,
  errorToast,
  internationalPhoneRegex,
  passwordRegex,
  successToast,
} from '@src/utils';
import { useForm, UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { setErrorsInForm } from '@utils/error-handling';
import { IBranchItem } from '@src/types';
import { IGarageCustomerForm, StepsEnum } from './GarageCustomers.types';
import { createGarageCustomerDefaultValues } from './GarageCustomers.constants';

export const garageCustomerSchema = yup.object().shape({
  name: yup.string().when('step', {
    is: (step: StepsEnum) => step === StepsEnum.CUSTOMER,
    then: yup.string().required(i18next.t('shared.validation.is_required', { name: 'Garage name' })),
  }),
  branchId: yup.string().when('step', {
    is: (step: StepsEnum) => step === StepsEnum.CUSTOMER,
    then: yup.string().required(i18next.t('shared.validation.is_required', { name: 'Branch' })),
  }),
  contact: yup.object().when('step', {
    is: (step: StepsEnum) => step === StepsEnum.CUSTOMER,
    then: yup.object().shape({
      address: yup.string().required(i18next.t('shared.validation.is_required', { name: 'Address' })),
      city: yup.string().required(i18next.t('shared.validation.is_required', { name: 'City' })),
      postCode: yup.string().required(i18next.t('shared.validation.is_required', { name: 'Post code' })),
      countryId: yup
        .string()
        .typeError(i18next.t('shared.validation.is_required', { name: 'Country' }))
        .required(i18next.t('shared.validation.is_required', { name: 'Country' })),
      phone: yup.string().matches(internationalPhoneRegex, {
        message: i18next.t('shared.validation.not_valid', { name: 'Phone number' }),
      }),
      email: yup
        .string()
        .required(i18next.t('shared.validation.email_required'))
        .matches(emailRegex, { message: i18next.t('shared.validation.email_invalid') }),
    }),
  }),
  users: yup.array().when('step', {
    is: (step: StepsEnum) => step === StepsEnum.USER,
    then: yup.array().of(
      yup.object().shape({
        firstName: yup.string().required(i18next.t('shared.validation.is_required', { name: 'First name' })),
        lastName: yup.string().required(i18next.t('shared.validation.is_required', { name: 'Last Name' })),
        username: yup.string().required(i18next.t('shared.validation.is_required', { name: 'Username' })),
        phone: yup.string().matches(internationalPhoneRegex, {
          message: i18next.t('shared.validation.not_valid', { name: 'Phone number' }),
        }),
        email: yup
          .string()
          .required(i18next.t('shared.validation.email_required'))
          .matches(emailRegex, { message: i18next.t('shared.validation.email_invalid') }),
        password: yup
          .string()
          .required(i18next.t('shared.validation.password_required'))
          .matches(passwordRegex, { message: i18next.t('shared.validation.password_invalid') })
          .min(8),
      })
    ),
  }),
});

const createGarage = (data: Record<string, any>) => {
  return axios('customer', {
    method: 'POST',
    data,
  });
};

const getActiveBranches = () => {
  return customFetcher<IBranchItem[]>('branch', {
    method: 'GET',
  });
};

export const useActiveBranches = () => {
  return useQuery(['active-branches'], getActiveBranches);
};

const useCreateGarage = (methods: UseFormReturn<IGarageCustomerForm, any>) => {
  return useMutation([], (data: Record<string, any>) => createGarage(data), {
    onError: (err: any) => {
      const { errors, message } = err.response.data;
      if (errors) {
        setErrorsInForm(errors, methods.setError);
        const errorKeys = Object.keys(errors)
          .map((key) => key)
          .join(',');
        if (errorKeys.includes('contact.') || errorKeys.includes('name') || errorKeys.includes('branchId')) {
          methods.setValue('step', StepsEnum.CUSTOMER);
        }
      } else if (message) {
        errorToast({ message });
      }
    },
  });
};

export const useCreateGarageForm = ({
  defaultValues,
  onClose,
}: {
  defaultValues: IGarageCustomerForm;
  onClose: (needsReload?: boolean) => void;
}) => {
  const methods = useForm({
    resolver: yupResolver(garageCustomerSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: defaultValues || createGarageCustomerDefaultValues,
  });
  const createGarageMutation = useCreateGarage(methods);
  const onSubmit = (data: Record<string, any>) => {
    createGarageMutation.mutateAsync(data).then((response: any) => {
      if (response.data.success) {
        successToast({ message: response.data.message });
        onClose(true);
      } else {
        errorToast({ message: response.data.message });
      }
    });
  };

  return {
    methods,
    onSubmit,
    isLoading: createGarageMutation.isLoading,
  };
};
