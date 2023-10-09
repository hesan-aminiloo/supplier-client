import { TableColumn } from '@src/components';
import { RequestStatus } from '@src/types';

export const SKELETON_CARD_COUNT = 5;
export const SKELETON_TABLE_COUNT = 7;
export const SKELETON_TABLE_ROW_COUNT = 2;
export const SKELETON_NOTE_COUNT = 1;

export const SKELETON_BUTTON_COUNT = 2;

export const SKELETON_PARTS_RETURNED_COUNT = 4;

// TODO:: update this constant
export const HAS_CANCEL_ACTION_REQUESTS: RequestStatus[] = [
  'response_required',
  'response_sent',
  'response required',
  'response sent',
];
// TODO:: update this constant
export const HAS_DETAILS_ACTION_REQUESTS: RequestStatus[] = ['confirmed', 'response_sent', 'response sent'];
export const HAS_DISPATCH_ACTION_REQUESTS: RequestStatus[] = ['confirmed'];
export const HAS_CREATE_ACTION_REQUESTS: RequestStatus[] = ['response required', 'response_required'];

export const REQUIRED_PARTS_COLUMNS: TableColumn[] = [
  {
    field: 'image',
    title: 'request_details.part_details.image',
  },
  {
    field: 'part_number_or_description',
    title: 'request_details.part_details.part_number_or_description',
  },
  {
    field: 'quantity',
    title: 'request_details.part_details.quantity',
  },
];

export const CONFIRMED_REQUIRED_PARTS_COLUMNS: TableColumn[] = [
  {
    field: 'image',
    title: 'request_details.part_details.image',
  },
  {
    field: 'part_number',
    title: 'request_details.part_details.part_number',
  },
  {
    field: 'description',
    title: 'request_details.part_details.description',
  },
  {
    field: 'quantity',
    title: 'request_details.part_details.quantity',
  },
  {
    field: 'line_total',
    title: 'request_details.part_details.line_total',
  },
  {
    field: 'delivery',
    title: 'request_details.part_details.delivery',
  },
];

// TODO:: update this constant
export const HAVE_ACTION_REQUEST_STATUSES: RequestStatus[] = [
  'confirmed',
  'canceled',
  'response_sent',
  'response_required',
  'response sent',
  'response required',
];
