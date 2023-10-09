import { array, mixed, number, object, string } from 'yup';
import { CreateResponseFormTypes, ResponseStatus } from '@src/pages/Request/RequestDetails';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import i18next from '@src/app/localization/i18n';
import { successToast } from '@src/utils';
import { createRequestResponse } from '@src/app/endpoints/request';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { IPostRequestPartDetails } from '@src/types';
import { setErrorsInForm } from '@utils/error-handling';
import axios from 'axios';

export const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear(); // 4-digit year
  const month = today.getMonth() + 1; // Month index starts from 0, so adding 1
  const day = today.getDate();

  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};

const partIsStocked = (response: Pick<IPostRequestPartDetails, 'quantity' | 'inStock'>) => {
  return response.inStock.toString() === 'true' && (response.quantity ?? 0) > 0;
};

export const partsAreStocked = (responses: Pick<IPostRequestPartDetails, 'quantity' | 'inStock'>[]): boolean => {
  return !!responses.find(partIsStocked);
};

export const pushResponseOriginalFields = (
  response: IPostRequestPartDetails
): Pick<IPostRequestPartDetails, 'description' | 'quantity' | 'inStock' | 'deliveryDate'> => {
  return {
    description: response.description,
    quantity: Number(response.quantity ?? 0),
    inStock: response.inStock,
    deliveryDate: response.deliveryDate ?? getTodayDate(),
  };
};

export const createResponseFormValidations = object({
  headers: object({
    fuelType: string(),
    notes: string(),
    engine: string(),
    gearbox: string(),
    make: string(),
    model: string(),
  }),
  responses: array()
    .min(1, 'required')
    .of(
      object({
        id: string().required(i18next.t('shared.validation.is_required', { name: 'Detail id' })),
        partNumber: string()
          .nullable()
          .when('inStock', {
            is: (inStock: string) => inStock === 'true',
            then: string()
              .nullable()
              .typeError(i18next.t('shared.validation.not_valid', { name: 'Part number' })),
          }),
        quantity: mixed()
          .nullable()
          .when('inStock', {
            is: (inStock: string) => inStock === 'true',
            then: number()
              .typeError(i18next.t('shared.validation.is_required', { name: 'Quantity' }))
              .min(1, "Quantity can't be less than 1")
              .required(i18next.t('shared.validation.is_required', { name: 'Quantity' })),
          }),
        unitPrice: mixed()
          .nullable()
          .when('inStock', {
            is: (inStock: string) => inStock === 'true',
            then: number()
              .typeError(i18next.t('shared.validation.is_required', { name: 'Unit price' }))
              .min(0, i18next.t('shared.validation.is_required', { name: 'Unit price' }))
              .required(i18next.t('shared.validation.is_required', { name: 'Unit price' })),
          }),
        inStock: string().required(i18next.t('shared.validation.is_required', { name: 'in stock' })),
        deliveryDate: string(),
      })
    ),
  extra: array().of(
    object({
      description: string().required(i18next.t('shared.validation.is_required', { name: 'Part name' })),
      partNumber: string()
        .nullable()
        .typeError(i18next.t('shared.validation.is_required', { name: 'Part number' })),
      quantity: number()
        .typeError(i18next.t('shared.validation.is_required', { name: 'Quantity' }))
        .min(1, "Quantity can't be less than 1")
        .required(i18next.t('shared.validation.is_required', { name: 'Quantity' })),
      unitPrice: number()
        .typeError(i18next.t('shared.validation.is_required', { name: 'Unit price' }))
        .min(1, i18next.t('shared.validation.is_required', { name: 'Unit price' }))
        .required(i18next.t('shared.validation.is_required', { name: 'Unit price' })),
      inStock: string().required(i18next.t('shared.validation.is_required', { name: 'in stock' })),
      deliveryDate: string().required(i18next.t('shared.validation.is_required', { name: 'Delivery Date' })),
    })
  ),
});

export const getPartPrice = ({
  unitPrice,
  quantity,
}: Pick<IPostRequestPartDetails, 'unitPrice' | 'quantity'>): number => {
  if (unitPrice && quantity) {
    return Number((Number(unitPrice) * Number(quantity)).toFixed(2));
  }
  return 0;
};

export const getRequestTotalAmount = (parts: Pick<IPostRequestPartDetails, 'unitPrice' | 'quantity'>[]): number => {
  if (parts.length === 0) return 0;
  const totalAmount =
    parts
      .map((part) => getPartPrice(part))
      .reduce((previousValue: number, currentValue: number) => {
        return (previousValue ?? 0) + (currentValue ?? 0);
      }) ?? 0;
  return Number(totalAmount.toFixed(2));
};

export const createResponseFormDefaultValues = (
  initialValues: Partial<CreateResponseFormTypes>,
  requestType: 'order' | 'quote'
): CreateResponseFormTypes => {
  return {
    status: requestType === 'order' ? 'confirmed' : 'request_confirmation',
    headers: {
      engine: '',
      fuelType: '',
      gearbox: '',
      notes: '',
      make: '',
      model: '',
      total: getRequestTotalAmount([...(initialValues.responses ?? []), ...(initialValues.extra ?? [])]),
    },
    extra: [],
    ...initialValues,
    responses: (initialValues.responses ?? []).map((response) => ({
      ...response,
      lineTotal: getPartPrice(response),
      inStock: true,
      deliveryDate: getTodayDate(),
    })),
  };
};

const createResponseService = (requestId: string, response: CreateResponseFormTypes) => {
  return axios.post(createRequestResponse(requestId), response);
};

const useCreateResponse = (requestId: string) => {
  return useMutation([createRequestResponse(requestId)], (response: CreateResponseFormTypes) =>
    createResponseService(requestId, response)
  );
};

export const useCreateResponseForm = (
  initialValues: Partial<CreateResponseFormTypes>,
  closeModal: () => void,
  requestType: 'order' | 'quote'
) => {
  const methods = useForm<CreateResponseFormTypes>({
    resolver: yupResolver(createResponseFormValidations),
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: createResponseFormDefaultValues(initialValues, requestType),
  });
  const queryClient = useQueryClient();
  const { id = '' } = useParams();
  const createResponse = useCreateResponse(id);

  const onSubmit = (status: ResponseStatus) => (fields: CreateResponseFormTypes) => {
    // TODO:: fix DTO issues with backend
    createResponse
      .mutateAsync({
        ...fields,
        status,
        headers: {
          ...fields.headers,
          total: getRequestTotalAmount([...fields.responses, ...fields.extra]),
        },
        responses: fields.responses.map((response) => ({
          ...response,
          detailId: response.id,
          inStock: response.inStock === 'true',
          unitPrice: response.unitPrice?.toString() === '' ? null : response.unitPrice,
          quantity: [0, '0', null].includes(response.quantity) ? null : response.quantity,
          lineTotal: getPartPrice(response) === 0 ? null : getPartPrice(response),
        })),
        extra: fields.extra.map((extraItem) => ({
          ...extraItem,
          detailId: extraItem.id,
          inStock: extraItem.inStock === 'true',
          lineTotal: getPartPrice(extraItem),
        })),
      })
      .then(() => {
        queryClient.invalidateQueries([`request/${id}`]);
        if (status === 'confirmed') {
          successToast({
            message: i18next.t('request_details.create_response.order_confirmed'),
          });
        } else {
          successToast({
            message: i18next.t('request_details.create_response.confirmation_request_sent'),
          });
        }
        closeModal();
      })
      .catch((err) => {
        setErrorsInForm(err?.response?.data?.errors, methods.setError);
      });
  };

  return {
    methods,
    onSubmit,
    isLoading: createResponse.isLoading,
  };
};
