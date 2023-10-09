import { CreateResponseFormElement, PartFormElement } from '@src/pages/Request/RequestDetails';
import { FormInput, FormDropDown } from '@src/components';
import { DropDownOption } from '@components/text-fields';
import i18next from '@src/app/localization/i18n';

export const inStockOptions: DropDownOption[] = [
  {
    label: i18next.t('request_details.create_response.in_stock.yes'),
    value: true,
  },
  {
    label: i18next.t('request_details.create_response.in_stock.no'),
    value: false,
  },
];

export const fuelTypeOptions: DropDownOption[] = [
  {
    label: i18next.t('request_details.create_response.fuel_types.petrol'),
    value: 'petrol',
  },
  {
    label: i18next.t('request_details.create_response.fuel_types.diesel'),
    value: 'diesel',
  },
  {
    label: i18next.t('request_details.create_response.fuel_types.electric'),
    value: 'electric',
  },
  {
    label: i18next.t('request_details.create_response.fuel_types.petrol_electric'),
    value: 'petrol_electric',
  },
  {
    label: i18next.t('request_details.create_response.fuel_types.petrol_ethanol'),
    value: 'petrol_ethanol',
  },
  {
    label: i18next.t('request_details.create_response.fuel_types.petrol_cng'),
    value: 'petrol_cng',
  },
  {
    label: i18next.t('request_details.create_response.fuel_types.petrol_lpg'),
    value: 'petrol_lpg',
  },
];

export const CREATE_RESPONSE_FORM_ELEMENTS: CreateResponseFormElement[] = [
  {
    type: 'text',
    label: 'request_details.create_response.vehicle_make',
    placeholder: 'request_details.create_response.vehicle_make',
    name: 'make',
    component: FormInput,
  },
  {
    type: 'text',
    label: 'request_details.create_response.vehicle_model',
    name: 'model',
    placeholder: 'request_details.create_response.vehicle_model',
    component: FormInput,
  },
  {
    type: 'email',
    label: 'request_details.create_response.fuel_type',
    name: 'fuelType',
    placeholder: 'request_details.create_response.fuel_type',
    options: fuelTypeOptions,
    component: FormDropDown,
  },
  {
    type: 'text',
    label: 'request_details.create_response.engine',
    name: 'engine',
    placeholder: 'request_details.create_response.engine',
    component: FormInput,
  },
  {
    type: 'text',
    label: 'request_details.create_response.gearbox',
    placeholder: 'request_details.create_response.gearbox',
    name: 'gearbox',
    component: FormInput,
  },
  {
    type: 'text',
    label: 'request_details.create_response.notes',
    placeholder: 'request_details.create_response.notes',
    name: 'note',
    className: 'col-span-3',
    component: FormInput,
  },
];

export const PART_FORM_ELEMENTS: PartFormElement[] = [
  {
    label: 'request_details.part.in_stock',
    name: 'inStock',
    options: inStockOptions,
    className: 'col-span-1',
    component: FormDropDown,
  },
  {
    type: 'text',
    label: 'request_details.part.number',
    placeholder: 'request_details.part.number',
    name: 'partNumber',
    className: 'col-span-2',
    component: FormInput,
  },
  {
    label: 'request_details.part.quantity',
    placeholder: 'request_details.part.quantity',
    name: 'quantity',
    className: 'col-span-1',
    component: FormInput,
    type: 'number',
  },
  {
    type: 'number',
    label: 'request_details.part.unit_price',
    placeholder: 'request_details.part.unit_price',
    name: 'unitPrice',
    className: 'col-span-2',
    component: FormInput,
  },
  {
    type: 'text',
    label: 'request_details.part.line_total',
    placeholder: 'request_details.part.line_total',
    name: 'lineTotal',
    className: 'col-span-2',
    component: FormInput,
    readOnly: true,
  },
  {
    label: 'request_details.part.delivery_date',
    name: 'deliveryDate',
    className: 'col-span-2',
    component: FormInput,
    type: 'date',
    min: new Date().toISOString().split('T')[0],
  },
  {
    type: 'text',
    label: 'request_details.create_response.notes',
    placeholder: 'request_details.create_response.notes',
    name: 'notes',
    className: 'col-span-10',
    component: FormInput,
  },
];
