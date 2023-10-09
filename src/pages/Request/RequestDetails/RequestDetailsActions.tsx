import React from 'react';
import { useTranslation } from 'react-i18next';

// components
import { Button } from '@src/components';
import RenderWhen from '@components/RenderWhen';

// types
import {
  HAS_CANCEL_ACTION_REQUESTS,
  HAS_CREATE_ACTION_REQUESTS,
  HAS_DETAILS_ACTION_REQUESTS,
  HAS_DISPATCH_ACTION_REQUESTS,
  RequestDetailsActionsProps,
} from '@src/pages/Request/RequestDetails';
import moment from 'moment';

export const RequestDetailsActions: React.FC<RequestDetailsActionsProps> = ({
  onCreateResponse,
  onDispatchResponse,
  onCancelResponse,
  onGetResponseDetails,
  isCancelingRequest,
  isDispatchingRequest,
  status,
  hasResponse,
  hasDispatched,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between align-center mt-4">
      <RenderWhen is={HAS_CREATE_ACTION_REQUESTS.includes(status)}>
        <Button
          variant="solid"
          color="primary"
          onClick={onCreateResponse}
          disabled={isCancelingRequest}
        >
          {t('request_details.create_response.title')}
        </Button>
      </RenderWhen>
      <RenderWhen is={HAS_DISPATCH_ACTION_REQUESTS.includes(status)}>
        <Button
          variant="solid"
          color="primary"
          loading={isDispatchingRequest}
          onClick={onDispatchResponse}
          disabled={!!hasDispatched}
        >
          {hasDispatched
            ? `${t('request_details.dispatched_at')} ${moment(hasDispatched as string).format('DD/MM/YYYY HH:mm')}`
            : t('request_details.dispatch_request')}
        </Button>
      </RenderWhen>
      <RenderWhen is={HAS_DETAILS_ACTION_REQUESTS.includes(status) || hasResponse}>
        <Button
          variant="solid"
          color="primary"
          onClick={onGetResponseDetails}
        >
          {t('request_details.response_details')}
        </Button>
      </RenderWhen>
      <RenderWhen is={HAS_CANCEL_ACTION_REQUESTS.includes(status)}>
        <Button
          variant="tertiary"
          color="destructive"
          onClick={onCancelResponse}
          loading={isCancelingRequest}
        >
          {t('request_details.cancel_request')}
        </Button>
      </RenderWhen>
    </div>
  );
};

export default RequestDetailsActions;
