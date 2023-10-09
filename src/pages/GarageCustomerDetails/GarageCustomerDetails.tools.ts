/* eslint-disable camelcase */
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProps, TableRow } from '@src/components';
import { customFetcher, emailRegex, phoneRegex, errorToast, generateMonthName, formatMoney } from '@src/utils';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IGarageMonthlyIncome } from '@src/types';
import { IMessageResponse } from '@src/types/dto/systemUsers';
import { useMutation } from '@tanstack/react-query';
import { getIncomeViewButton } from '@src/pages/GarageCustomerDetails/components';
import { GarageDetailsObjectType } from './GarageCustomerDetails.types';

export const UserDetailsDrawerSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    userName: yup.string().required(t('shared.validation.userName_required')),
    phone: yup.string().matches(phoneRegex, { message: t('shared.validation.phone_invalid') }),
    email: yup
      .string()
      .matches(emailRegex, { message: t('shared.validation.email_invalid') })
      .required(t('shared.validation.email_required')),
  });
};

export const changeUserStatus = (garageId: string, id: number, active: number) => {
  return customFetcher<IMessageResponse>(`customer/garage/${garageId}/user/${id}/toggle`, {
    method: 'POST',
    body: JSON.stringify({ _method: 'put', toggle: active === 1 }),
  });
};

export const useChangeUserStatus = () => {
  return useMutation(
    [],
    (data: { garageId: string; id: number; active: number }) => changeUserStatus(data.garageId, data.id, data.active),
    {
      onError: (err: any) => {
        errorToast({ message: err?.response?.data?.message });
      },
    }
  );
};

export const useUserDetailsDrawerForm = () => {
  // TODO: Change any type
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const { garageId } = useParams();

  const defaultValues = {
    username: '',
    phone: '',
    email: '',
    currentPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(UserDetailsDrawerSchema()),
    mode: 'onChange',
    defaultValues,
  });

  const onSubmit: FormProps<any>['onSubmit'] = (fields) => {
    setIsLoading(true);
    setIsLoading(false);
    customFetcher(`customer/garage/${garageId}`, {
      method: 'PUT',
      body: JSON.stringify({ ...fields, _method: 'put' }),
    })
      .then((data) => {
        setResult(data);
        setIsLoading(false);
        setHasError(false);
      })
      .catch((err) => {
        errorToast({ message: err?.response?.data?.message });
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

export const useGarageDetails = () => {
  const { garageId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [garageDetails, setGarageDetails] = useState<GarageDetailsObjectType | null>(null);

  const fetchGarageDetails = (id?: string, refetch?: boolean) => {
    if (id) {
      if (!refetch) {
        setIsLoading(true);
      }
      axios
        .get(`/customer/garage/${id}`)
        .then(({ data }) => {
          setGarageDetails(data.data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchGarageDetails(garageId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [garageId]);

  return {
    isLoading,
    garageDetails,
    fetchGarageDetails,
  };
};

export const useGarageUsers = () => {
  const [loadingAcceptingUsers, setLoadingAcceptingUsers] = useState<string[]>([]);
  const [loadingDecliningUsers, setLoadingDecliningUsers] = useState<string[]>([]);
  const { garageId = '' } = useParams();

  const setLoading = (id: string, toggle: boolean, loading: boolean) => {
    if (loading) {
      if (toggle) {
        setLoadingAcceptingUsers([...loadingAcceptingUsers, id]);
      } else {
        setLoadingDecliningUsers([...loadingAcceptingUsers, id]);
      }
    } else if (toggle) {
      setLoadingAcceptingUsers(loadingAcceptingUsers.filter((userId) => userId !== id));
    } else {
      setLoadingDecliningUsers(loadingAcceptingUsers.filter((userId) => userId !== id));
    }
  };

  const toggleUser = (toggle: boolean) => (id: string, callback?: (garageId: string) => void) => {
    setLoading(id, toggle, true);
    axios
      .post(`customer/garage/${garageId}/user/${id}/toggle`, { _method: 'put', toggle })
      .then(() => {
        setLoading(id, toggle, false);
        callback?.(garageId);
      })
      .catch(() => {
        setLoading(id, toggle, false);
      });
  };

  return {
    loadingAcceptingUsers,
    loadingDecliningUsers,
    acceptUser: toggleUser(true),
    declineUser: toggleUser(false),
  };
};

export const generateGarageOverallRevenueRows = (incomes: IGarageMonthlyIncome[]): TableRow[] => {
  return (incomes ?? []).map((income) => ({
    id: income.month + income.year,
    data: [
      {
        field: 'month',
        data: generateMonthName(income.month),
      },
      {
        field: 'quotes',
        data: income.quotes,
      },
      {
        field: 'orders',
        data: income.orders,
      },
      {
        field: 'income',
        data: formatMoney(Number(income.total ?? 0)),
      },
      {
        field: 'requests',
        data: getIncomeViewButton(`${income.year}-${income.month}-30`),
      },
    ],
  }));
};

export const removeUserDevice = (garage: string, user: number) => {
  return customFetcher(`customer/garage/${garage}/user/${user}/device`, {
    method: 'DELETE',
  });
};

export const useRemoveUserDevice = () => {
  return useMutation([], (data: { garage: string; user: number }) => removeUserDevice(data.garage, data.user), {
    onError: (err: any) => {
      errorToast({ message: err?.response?.data?.message });
    },
  });
};
