import { CamelToSnake } from '@src/types';

export type PartStatus = 'confirmed' | 'canceled';

export interface IPostRequestPartDetails {
  notes: string;
  description: string;
  quantity: number | null;
  image_files: string[];
  id: number;
  partNumber: number | null;
  lineTotal: number | null;
  unitPrice: number | null;
  deliveryDate: string | Date;
  inStock: boolean | string;
  status: PartStatus;
}

export interface IGetRequestPartDetails extends CamelToSnake<Omit<IPostRequestPartDetails, 'image_files'>> {
  image_files: string[];
  video_files: string[];
  res_id?: number;
  is_invoice: 1 | 0;
}

export type RequestStatus =
  | 'confirmed'
  | 'canceled'
  | 'missed_quote'
  | 'response_required'
  | 'response_sent'
  | 'missed quote'
  | 'response required'
  | 'response sent'
  | 'dispatched';

export type RequestType = 'order' | 'quote';

export interface IRequestOverAllDetails {
  created_at: string;
  document: string;
  garageLogo: string;
  garageName: string;
  note: string;
  reg_num: string;
  status: RequestStatus;
  type: RequestType;
  vin_num: string;
}

export interface IRequest extends IRequestOverAllDetails {
  id: number;
  account_id: number;
}

export interface IRequestDetailsDTO {
  request: IRequest;
  details: IGetRequestPartDetails[];
  countMsg: number;
  countUnreadMsg: string;
  hasResponse?: boolean;
  hasDispatched?: boolean | string;
  branch: {
    id: number;
    name: string;
  };
}

export interface IRequestListItem {
  id: string;
  account_id: number;
  countMsg: number;
  countUnreadMsg: string;
  logo: string;
  name: string;
  note: string;
  reg_num: string;
  requestType: RequestType;
  status: RequestStatus;
  type: string;
  vin_num: string;
  created_at: string;
  dispatched_at: string;
  branchName: string;
  branchId: string;
}

export interface IResponseHeader {
  make: string;
  model: string;
  fuelType: string;
  fuel_type: string;
  engine: string;
  gearbox: string;
  note: string;
  total: number | string | null;
}

export interface IRequestResponseDetails {
  partsRequired: {
    exception: any;
    headers: IResponseHeader;
    original: {
      data: IGetRequestPartDetails[];
    };
  };
  partsRequiredNote: string;
  responseDetails: IGetRequestPartDetails[];
  responseHeader: IResponseHeader[];
}
