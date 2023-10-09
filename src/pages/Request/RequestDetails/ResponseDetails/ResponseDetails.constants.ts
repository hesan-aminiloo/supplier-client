import { CreateResponseFormElement } from '@src/pages/Request/RequestDetails';
import { Input } from '@components/text-fields';

export const RESPONSE_HEADER_ELEMENTS: CreateResponseFormElement[] = [
  {
    type: 'text',
    label: 'request_details.create_response.vehicle_make',
    placeholder: 'request_details.create_response.vehicle_make',
    name: 'make',
    component: Input,
  },
  {
    type: 'text',
    label: 'request_details.create_response.vehicle_model',
    name: 'model',
    placeholder: 'request_details.create_response.vehicle_model',
    component: Input,
  },
  {
    type: 'email',
    label: 'request_details.create_response.fuel_type',
    name: 'fuel_type',
    placeholder: 'request_details.create_response.fuel_type',
    component: Input,
  },
  {
    type: 'text',
    label: 'request_details.create_response.engine',
    name: 'engine',
    placeholder: 'request_details.create_response.engine',
    component: Input,
  },
  {
    type: 'text',
    label: 'request_details.create_response.gearbox',
    placeholder: 'request_details.create_response.gearbox',
    name: 'gearbox',
    component: Input,
  },
  {
    type: 'text',
    label: 'request_details.create_response.notes',
    placeholder: 'request_details.create_response.notes',
    name: 'note',
    className: 'col-span-3',
    component: Input,
  },
];
