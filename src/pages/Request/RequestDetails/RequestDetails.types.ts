import { IGetRequestPartDetails, IPostRequestPartDetails, RequestStatus } from '@src/types';

export interface RequestDetailsActionsProps {
  onCreateResponse: () => void;
  onCancelResponse: () => void;
  onDispatchResponse: () => void;
  onGetResponseDetails: () => void;
  isCancelingRequest: boolean;
  isDispatchingRequest: boolean;
  status: RequestStatus;
  hasResponse?: boolean;
  hasDispatched?: boolean | string;
}

export interface RequestDetailsNoteProps {
  note: string;
  title?: string;
  hideIcon?: boolean;
}

export interface RequestDetailsVideoProps {
  videoUrl: string;
}

export interface RequestDetailsHeaderOptionsProps {
  onOpenConversation: () => void;
}

export interface RequestDetailsPartsProps {
  parts: IGetRequestPartDetails[];
  status: RequestStatus;
}

export interface RequestDetailsPartsReturnedProps {
  returnedParts: IPostRequestPartDetails[];
}
