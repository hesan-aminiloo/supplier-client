import { Image, TableRow } from '@src/components';
import React from 'react';
import {
  getCancelRequestEndPoint,
  getDispatchRequestEndPoint,
  getRequestEndPoint,
  getRequestResponseEndPoint,
} from '@src/app/endpoints/request';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IGetRequestPartDetails, RequestStatus } from '@src/types';
import { customFetcher, formatMoney, generateImageUrl } from '@src/utils';
import clsx from 'clsx';
import moment from 'moment/moment';
import axios from 'axios';

const dispatchRequest = async (requestId: string, notify: boolean) => {
  return axios.post(getDispatchRequestEndPoint(requestId), {
    notify,
    res: true,
  });
};

const getRequestDetails = async (requestId: string) => {
  return customFetcher(getRequestEndPoint(requestId), {
    method: 'GET',
  });
};

const getRequestResponseDetails = async (requestId: string) => {
  return customFetcher(getRequestResponseEndPoint(requestId), {
    method: 'GET',
  });
};

const cancelRequest = async (requestId: string) => {
  return customFetcher(getCancelRequestEndPoint, {
    method: 'POST',
    body: JSON.stringify({
      request_id: requestId,
      status: 'canceled',
    }),
  });
};

export const useRequest = (requestId: string) => {
  return useQuery([`request/${requestId}`], () => getRequestDetails(requestId));
};

export const useRequestResponseDetails = (requestId: string) => {
  return useQuery([`response-detail/${requestId}`], () => getRequestResponseDetails(requestId), {
    enabled: !!requestId,
  });
};

export const useCancelRequest = (requestId: string) => {
  return useMutation([`request/${requestId}/cancel`], () => cancelRequest(requestId));
};

export const useDispatchRequest = (requestId: string) => {
  return useMutation([`request/${requestId}/dispatch`], (data: { notify: boolean }) =>
    dispatchRequest(requestId, data?.notify)
  );
};

export const getRequestStatusColor = (status: RequestStatus) => {
  switch (status) {
    case 'confirmed':
      return 'success';
    case 'response_required':
    case 'response required':
      return 'warning';
    case 'canceled':
      return 'destructive';
    case 'response_sent':
    case 'response sent':
      return 'analogousTeal';
    case 'missed_quote':
    case 'missed quote':
      return 'analogousIndigo';
    case 'dispatched':
      return 'neutral';
    default:
      return '';
  }
};

export const getPartStatusColor = (status: 1 | 0 | null | undefined) => {
  switch (status) {
    case 1:
      return 'success';
    case 0 || null:
      return 'destructive';
    default:
      return 'transparent';
  }
};

export const generatePartRows = (
  parts: IGetRequestPartDetails[],
  showGallery: (images: string[]) => void
): TableRow[] => {
  return parts.map((part) => ({
    id: part.id,
    className: clsx(
      `bg-${getPartStatusColor(part.is_invoice)}-50`,
      part.is_invoice !== undefined && part.is_invoice !== 1 && 'line-through'
    ),
    data: [
      {
        field: 'image',
        data:
          part.image_files && part.image_files?.length > 0 ? (
            <Image
              size="xxl"
              src={generateImageUrl(part.image_files[0])}
              className="cursor-pointer"
              onClick={() => showGallery(part.image_files)}
            />
          ) : (
            <Image size="xxl" />
          ),
      },
      {
        field: 'part_number',
        data: part.part_number,
      },
      {
        field: 'description',
        data: part.description ?? '-',
      },
      {
        field: 'part_number_or_description',
        data: part.part_number ?? part.description ?? '-',
      },
      {
        field: 'quantity',
        data: part.quantity,
      },
      {
        field: 'line_total',
        data: formatMoney(part.line_total ?? 0),
      },
      {
        field: 'delivery',
        data: moment(part.delivery_date?.toString?.()).format('DD/MM/YYYY') ?? '-',
      },
    ],
  }));
};

export const getRequestStatusText = (status: RequestStatus) => {
  switch (status) {
    case 'confirmed':
      return 'Confirmed';
    case 'response_required':
    case 'response required':
      return 'Response Required';
    case 'response_sent':
    case 'response sent':
      return 'Response Sent';
    case 'missed_quote':
    case 'missed quote':
      return 'Missed Quote';
    case 'canceled':
      return 'Cancelled';
    case 'dispatched':
      return 'Dispatched';
    default:
      return '-';
  }
};

export const getRequestStatusIcon = (status: RequestStatus) => {
  switch (status) {
    case 'confirmed':
      return 'status';
    case 'response_sent':
    case 'response sent':
      return 'document-forward';
    case 'response_required':
    case 'response required':
      return 'danger';
    case 'canceled':
      return 'clipboard-close';
    case 'missed_quote':
    case 'missed quote':
      return 'transaction-minus';
    default:
      return 'clipboard-close';
  }
};

export function convertToMMSS(durationInSeconds: number) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}
