import { customFetcher, emailRegex, errorToast, phoneRegex, successToast } from '@src/utils';
import i18next from '@src/app/localization/i18n';
import * as yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { setErrorsInForm } from '@src/utils/error-handling';
import { IAddBranchResponseDto, IBranchItem } from '@src/types';
import { FormProps } from '@src/components';
import { useStore } from 'zustand';
import { coreStore } from '@src/store/core';
import axios from 'axios';
import {
  BranchFormValuesTypes,
  BranchItemType,
  SupplierInfoResType,
  UpdateCompanyInfoDataType,
} from './CompanyInfo.types';

export const companyInfoValidationSchema = yup.object({
  name: yup.string().required(i18next.t('shared.validation.is_required', { name: 'Company name' })),
  phone: yup
    .string()
    .matches(phoneRegex, { message: i18next.t('shared.validation.not_valid', { name: 'Phone' }) })
    .required(i18next.t('shared.validation.is_required', { name: 'Phone' })),
  email: yup
    .string()
    .matches(emailRegex, { message: i18next.t('shared.validation.email_invalid') })
    .required(i18next.t('shared.validation.email_required')),
  address: yup.string().required(i18next.t('shared.validation.is_required', { name: 'Address' })),
  city: yup.string().required(i18next.t('shared.validation.is_required', { name: 'City' })),
  postCode: yup.string().required(i18next.t('shared.validation.is_required', { name: 'Post code' })),
  countryId: yup.string().required(i18next.t('shared.validation.is_required', { name: 'Country' })),
  logo: yup
    .mixed()
    .test('fileSize', i18next.t('shared.validation.size_file_incorrect'), (value) => {
      if (typeof value === 'string' || !value) {
        return true;
      }
      return value.size <= 1024 * 1024; // File size should be less than or equal to 1MB
    })
    .test('fileFormat', i18next.t('shared.validation.format_file_incorrect'), (value) => {
      if (typeof value === 'string' || !value) {
        return true;
      }
      const supportedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
      return supportedFormats.includes(value.type);
    }),
});

export const addBranchSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, { message: i18next.t('shared.validation.email_invalid') })
    .required(i18next.t('shared.validation.email_required')),
  name: yup.string().required(i18next.t('shared.validation.is_required', { name: 'Branch name' })),
  phone: yup
    .string()
    .matches(phoneRegex, { message: i18next.t('shared.validation.not_valid', { name: 'Phone' }) })
    .required(i18next.t('shared.validation.is_required', { name: 'Phone' })),
  address: yup.string().required(i18next.t('shared.validation.is_required', { name: 'Address' })),
  city: yup.string().required(i18next.t('shared.validation.is_required', { name: 'City' })),
  postCode: yup.string().required(i18next.t('shared.validation.is_required', { name: 'Post code' })),
  countryId: yup.string().required(i18next.t('shared.validation.is_required', { name: 'Country' })),
  active: yup.boolean(),
  workingHours: yup.array().of(
    yup.object().shape({
      key: yup.string(),
    })
  ),
});

export const useBranch = (defaultValues: BranchFormValuesTypes, callback: () => void, branchId?: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const { user, setUser, permissions, token, countries } = useStore(coreStore);
  const methods = useForm({
    resolver: yupResolver(addBranchSchema),
    mode: 'onSubmit',
    values: defaultValues,
  });

  const onSubmit: FormProps<NonNullable<BranchFormValuesTypes>>['onSubmit'] = (fields, event) => {
    event?.preventDefault();
    setIsLoading(true);
    customFetcher(branchId ? `branch/${branchId}` : 'branch', {
      method: 'POST',
      body: branchId ? JSON.stringify({ _method: 'put', ...fields }) : JSON.stringify({ ...fields }),
    })
      .then((res) => {
        const data = res as unknown as IAddBranchResponseDto;
        const newBranch: IBranchItem = { id: data.branch.id, name: data.branch.name };
        if (user) {
          setUser({ user: { ...user, branch: [...(user?.branch ?? []), newBranch] }, token, countries, permissions });
        }
        callback();
        setIsLoading(false);
        setHasError(false);
        successToast({ message: data.message });
      })
      .catch((err) => {
        setErrorsInForm(err.message.errors, methods.setError);
        setHasError(true);
        setIsLoading(false);
      });
  };

  const onRestore = (id: BranchItemType['id']) => {
    setIsLoading(true);
    axios
      .post(`branch/${id}/restore`, { _method: 'put' })
      .then(({ data }) => {
        setIsLoading(false);
        successToast({ message: data.message });
        callback();
      })
      .catch((err) => {
        errorToast({ message: err.response.data.message });
        setIsLoading(false);
      });
  };

  const onDelete = (id: BranchItemType['id']) => {
    setIsLoading(true);
    axios
      .delete(`branch/${id}`)
      .then(({ data }) => {
        setIsLoading(false);
        successToast({ message: data.message });
        callback();
      })
      .catch((err) => {
        errorToast({ message: err.response.data.message });
        setIsLoading(false);
      });
  };

  return {
    methods,
    onSubmit,
    isLoading,
    hasError,
    onRestore,
    onDelete,
  };
};

export const useCompanyInfoForm = () => {
  const { user, setUser, token, permissions, countries } = useStore(coreStore);
  const [supplierInfo, setSupplierInfo] = useState<SupplierInfoResType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const methods = useForm({
    resolver: yupResolver(companyInfoValidationSchema),
    mode: 'onChange',
    defaultValues: useMemo(
      () => ({ name: supplierInfo?.name, ...supplierInfo?.contact, logo: supplierInfo?.logo }),
      [supplierInfo]
    ),
  });

  useEffect(() => {
    if (supplierInfo?.name) {
      methods.reset({ name: supplierInfo?.name, ...supplierInfo?.contact, logo: supplierInfo?.logo });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplierInfo?.name]);

  const getSupplierInfo = () => {
    setIsLoading(true);
    axios
      .get(`supplier/${user?.accountId}`)
      .then(({ data }) => {
        setIsLoading(false);
        setSupplierInfo(data as unknown as SupplierInfoResType);
        if (user)
          setUser({ user: { ...user, account: { ...user.account, logo: data.logo } }, token, countries, permissions });
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e.info);
      });
  };

  useEffect(() => {
    getSupplierInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (fields: UpdateCompanyInfoDataType) => {
    const formData = new FormData();
    formData.append('_method', 'put');
    formData.append('name', fields.name);
    if (fields.logo && typeof fields.logo === 'object') {
      formData.append('logo', fields.logo);
    }
    formData.append('contact[phone]', fields.phone);
    formData.append('contact[postCode]', fields.postCode);
    formData.append('contact[city]', fields.city);
    formData.append('contact[countryId]', fields.countryId);
    formData.append('contact[email]', fields.email);
    formData.append('contact[address]', fields.address);
    setLoading(true);
    axios
      .post(`supplier/${user?.accountId}`, formData)
      .then(({ data }) => {
        successToast({ message: data.message });
        getSupplierInfo();
        setLoading(false);
      })
      .catch((err) => {
        errorToast({ message: err.info.message });
        setErrorsInForm(err.response.data.errors, methods.setError);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    supplierInfo,
    methods,
    onSubmit,
    getSupplierInfo,
    isLoading,
    loading,
    setIsLoading,
  };
};
