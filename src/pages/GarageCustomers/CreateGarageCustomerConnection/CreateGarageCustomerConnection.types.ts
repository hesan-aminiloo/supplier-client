import { UseFormReturn } from 'react-hook-form';

export interface ICreateGarageConnection {
  isOpen: boolean;
  onClose: (needsReload?: boolean) => void;
}
export interface SearchGarageFormTypes {
  value: string;
}

export interface ICreateGarageConnectionSearchProps {
  onSubmit: (values: SearchGarageFormTypes) => void;
  methods: UseFormReturn<SearchGarageFormTypes, any>;
  isLoading: boolean;
}

export interface SearchGarageDetails {
  branches: {
    id: number;
    name: string;
    email: string;
  }[];
  garage: {
    branch: string;
    contact: {
      address: string;
      city: string;
      countryId: number;
      email: string;
      phone: string;
      postCode: string;
    };
    id: number;
    logo: string;
    name: string;
  };
}
