import { FormDropDown, FormInput } from '@src/components';
import { DropDownOption } from '@components/text-fields';
import { CreateResponseFormTypes } from '@src/pages/Request/RequestDetails';
import { UseFormReturn } from 'react-hook-form';
import { IPostRequestPartDetails } from '@src/types';

export type CreatePartFormInputNames = keyof IPostRequestPartDetails;

export interface CreatePartFormElement {
  type: string;
  label?: string;
  min?: number | string;
  name: CreatePartFormInputNames;
  placeholder?: string;
  className?: string;
  component: typeof FormDropDown | typeof FormInput;
  options?: DropDownOption[];
}

export interface NewPartFormTypes extends Omit<IPostRequestPartDetails, 'status'> {}

export interface NewPartFormProps {
  methods: UseFormReturn<CreateResponseFormTypes, any>;
}
