import { NewPartFormTypes } from '@src/pages/Request/RequestDetails';
import { IPostRequestPartDetails, IResponseHeader } from '@src/types';
import { DropDownOption, Input } from '@components/text-fields';
import { FormInput, FormDropDown } from '@src/components';

export interface CreateResponseFormElement {
  type: string;
  label: string;
  name: keyof IResponseHeader;
  placeholder: string;
  className?: string;
  component: typeof FormDropDown | typeof FormInput | typeof Input;
  options?: DropDownOption[];
}

export type ResponseStatus = 'confirmed' | 'request_confirmation';

export type CreateResponseFormTypes = {
  status: ResponseStatus;
  headers: {
    make: string;
    model: string;
    fuelType: string;
    engine: string;
    gearbox: string;
    notes: string;
    invoiceNum?: string;
    total: number | string | null;
  };
  responses: IPostRequestPartDetails[];
  extra: NewPartFormTypes[];
};

export interface CreateResponseFormProps {
  closeModal: () => void;
  onCancelRequest: () => void;
  isCancelingRequest: boolean;
  initialValues: Partial<CreateResponseFormTypes>;
  requestType: 'order' | 'quote';
}

export type PartInputNames =
  | 'partNumber'
  | 'unitPrice'
  | 'lineTotal'
  | 'deliveryDate'
  | 'inStock'
  | 'quantity'
  | 'notes';

export interface PartFormElement {
  type?: string;
  label: string;
  labelClassName?: string;
  name: PartInputNames;
  placeholder?: string;
  className?: string;
  options?: DropDownOption[];
  component: typeof FormInput | typeof FormDropDown;
  readOnly?: boolean;
  min?: number | string;
}
