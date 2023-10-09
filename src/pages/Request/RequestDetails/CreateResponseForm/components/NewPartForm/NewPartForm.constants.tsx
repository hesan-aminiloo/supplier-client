import { CreatePartFormElement, getTodayDate, NewPartFormTypes } from '@src/pages/Request/RequestDetails';
import { FormInput } from '@src/components';

export const CREATE_PART_FORM_ELEMENTS: CreatePartFormElement[] = [
  {
    type: 'text',
    label: 'request_details.part.new_part_name',
    placeholder: 'request_details.part.new_part_name',
    name: 'description',
    className: 'col-span-3',
    component: FormInput,
  },
  {
    type: 'text',
    label: 'request_details.create_response.notes',
    placeholder: 'request_details.create_response.notes',
    name: 'notes',
    className: 'col-span-9',
    component: FormInput,
  },
  {
    type: 'text',
    label: 'request_details.part.number',
    placeholder: 'request_details.part.number',
    name: 'partNumber',
    className: 'col-span-3',
    component: FormInput,
  },
  {
    type: 'number',
    label: 'request_details.part.quantity',
    name: 'quantity',
    className: 'col-span-1',
    component: FormInput,
  },
  {
    type: 'number',
    label: 'request_details.part.unit_price',
    placeholder: 'request_details.part.unit_price',
    name: 'unitPrice',
    className: 'col-span-3',
    component: FormInput,
  },
  {
    type: 'text',
    label: 'request_details.part.line_total',
    placeholder: 'request_details.part.line_total',
    name: 'lineTotal',
    className: 'col-span-2',
    component: FormInput,
  },
  {
    label: 'request_details.part.delivery_date',
    name: 'deliveryDate',
    className: 'col-span-2',
    type: 'date',
    component: FormInput,
    min: new Date().toISOString().split('T')[0],
  },
];

export const newPartDefaultValues: NewPartFormTypes = {
  id: 1,
  description: '',
  notes: '',
  quantity: null,
  lineTotal: null,
  unitPrice: null,
  partNumber: null,
  inStock: true,
  deliveryDate: getTodayDate(),
  image_files: [],
};
