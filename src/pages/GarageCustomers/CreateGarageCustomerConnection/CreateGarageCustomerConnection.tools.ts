import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { object, string } from 'yup';
import i18next from '@src/app/localization/i18n';
import { customFetcher, errorToast, successToast } from '@src/utils';
import { useMutation } from '@tanstack/react-query';
import {
  SearchGarageDetails,
  SearchGarageFormTypes,
} from '@src/pages/GarageCustomers/CreateGarageCustomerConnection/CreateGarageCustomerConnection.types';

const searchGarageService = (garageId: string) => {
  return customFetcher(`customer/garage/${garageId}/connect`, {
    method: 'GET',
  });
};

const useSearchGarage = () => {
  return useMutation(['search-garage'], (garageId: string) => searchGarageService(garageId), {
    onError: (err: any) => {
      errorToast({ message: err?.message?.message });
    },
  });
};

export const searchGarageFormValidations = object({
  value: string().required(i18next.t('shared.validation.is_required', { name: 'Garage ID' })),
});

export const useSearchGarageForm = () => {
  const methods = useForm<SearchGarageFormTypes>({
    resolver: yupResolver(searchGarageFormValidations),
    mode: 'onSubmit',
    defaultValues: {
      value: '',
    },
  });
  const { data, isError, isLoading, mutateAsync, reset } = useSearchGarage();

  const onSubmit = (values: SearchGarageFormTypes) => {
    mutateAsync(values.value);
  };

  return {
    methods,
    onSubmit,
    isLoading,
    data: data as unknown as SearchGarageDetails | undefined,
    isError,
    reset,
  };
};

const connectGarageService = (garageId: number, branchId: number) => {
  return customFetcher(`customer/garage/${garageId}/connect`, {
    method: 'POST',
    body: JSON.stringify({
      _method: 'put',
      branchId,
    }),
  });
};

export const useConnectGarage = (onClose: () => void) => {
  return useMutation(
    [],
    (data: { garageId: number; branchId: number }) => connectGarageService(data.garageId, data.branchId),
    {
      onSuccess: () => {
        successToast({ message: i18next.t('garage_customer_details.connect_garage_customer.success') });
        onClose();
      },
      onError: (err: any) => {
        errorToast({ message: err?.message?.message });
      },
    }
  );
};
