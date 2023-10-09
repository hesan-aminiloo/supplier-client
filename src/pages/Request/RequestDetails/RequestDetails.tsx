import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';

// layout
import { Content } from '@src/layouts/Content';

// components
import { Card, DrawerHeader, DrawerPlacement, Icon, ModalDrawer, Button } from '@src/components';
import RenderWhen from '@components/RenderWhen';

// local Components
import {
  RequestDetailsOverall,
  RequestDetailsParts,
  RequestDetailsNote,
  RequestDetailsActions,
  useRequest,
  useCancelRequest,
  HAVE_ACTION_REQUEST_STATUSES,
  RequestDetailsSkeleton,
  useDispatchRequest,
} from '@src/pages/Request/RequestDetails';
import { Messages, useRealTimeMessages } from 'src/pages/Request/RequestDetails/components/Messages';
import CreateResponseForm from '@src/pages/Request/RequestDetails/CreateResponseForm';

// hooks
import { useBoolean, useScrollToTop } from '@utils/hooks';
import { IRequestDetailsDTO } from '@src/types';

// styles
import { Theme } from '@src/style';
import ResponseDetails from '@src/pages/Request/RequestDetails/ResponseDetails/ResponseDetails';
import PopUp from '@components/pop-up/PopUp';
import { generateImageUrl, successToast } from '@src/utils';
import clsx from 'clsx';
import RequestDetailsVideo from '@src/pages/Request/RequestDetails/RequestDetailsVideo';

const RequestDetails: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  useScrollToTop();
  const [showConversation, setShowConversationActions] = useBoolean(searchParams.get('chat') === '1');
  const [showCreateResponse, setShowCreateResponseActions] = useBoolean(false);
  const [showResponseDetails, setShowResponseDetailsActions] = useBoolean(false);
  const { t } = useTranslation();
  const { id = '' } = useParams<{ id: string }>();
  const { data, isLoading, isRefetching } = useRequest(id);
  const request: IRequestDetailsDTO | undefined = data as unknown as IRequestDetailsDTO;
  const cancelRequest = useCancelRequest(id);
  const dispatchRequest = useDispatchRequest(id);
  const [dispatchPopup, setDispatchPopup] = useState({});
  const queryClient = useQueryClient();
  const [cancelPopup, setCancelPopup] = useState({});
  const { realTimesMessages, setRealTimeMessages, setSentMessage, conversationStatus, setConversationStatus } =
    useRealTimeMessages(id);
  const firstVideoUploaded = request?.details.find((detail) => detail.video_files.length > 0)?.video_files[0];
  useEffect(() => {
    if (request?.countMsg > 0) {
      setConversationStatus('hasMessages');
    }
    if (Number(request?.countUnreadMsg) > 0) {
      setConversationStatus('hasNewMessages');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const handleCancelRequest = () => {
    cancelRequest.mutateAsync().then(() => {
      setCancelPopup({ isOpen: false });
      setShowCreateResponseActions.setFalse();
      successToast({ message: 'Request was Cancelled' });
      queryClient.invalidateQueries([`request/${id}`]);
    });
  };

  const handleDispatchRequest = (notify: boolean) => {
    dispatchRequest.mutateAsync({ notify }).then(() => {
      setDispatchPopup({ isOpen: false });
      successToast({ message: 'Request was Dispatched' });
      queryClient.invalidateQueries([`request/${id}`]);
    });
  };

  const showCancelConfirmPopup = () => {
    setCancelPopup({
      isOpen: true,
      title: 'Cancel the request',
      description: 'This Action will cancel the request from the customer. Are you sure ?',
    });
  };

  const showDispatchConfirmPopup = () => {
    setDispatchPopup({
      isOpen: true,
      title: 'Items dispatched',
      description: 'This will mark the items as dispatched. Are you sure ?',
    });
  };

  const handleCloseConversation = () => {
    setShowConversationActions.setFalse();
    setSearchParams({ chat: '0' });
    if (conversationStatus === 'hasNewMessages') {
      setConversationStatus('hasMessages');
    }
  };

  return (
    <Content
      pageTitle={t('request_details.page_title', { requestType: request?.request?.type })}
      canGoBack
      rightContent={
        <div className="flex items-center">
          <span className="mr-4">{t('request_details.questions_chat_here')}</span>
          <Button
            onClick={() => {
              setShowConversationActions.setTrue();
              setRealTimeMessages([]);
              setSearchParams({ chat: '1' });
              if (conversationStatus === 'hasNewMessages') {
                setConversationStatus('hasMessages');
              }
            }}
            variant="tertiary"
            color="neutral"
            className="bg-white relative"
          >
            <Icon
              name="messages"
              color={Theme.colors.primary500}
            />
            <RenderWhen is={conversationStatus !== 'empty'}>
              <div
                className={clsx('absolute w-4 h-4 rounded-full -top-1.5 -right-1.5 border-2 border-warning-50', {
                  'bg-primary-600': conversationStatus === 'hasMessages',
                  'bg-destructive-600': conversationStatus === 'hasNewMessages',
                })}
              />
            </RenderWhen>
          </Button>
        </div>
      }
    >
      <RenderWhen is={isLoading || isRefetching}>
        <RequestDetailsSkeleton />
      </RenderWhen>
      {request?.request && (
        <RenderWhen is={!!request}>
          <div className="flex flex-col gap-8">
            <RequestDetailsOverall {...request.request} />
            <RequestDetailsParts
              parts={request.details}
              status={request.request.status}
            />
            {firstVideoUploaded ? <RequestDetailsVideo videoUrl={generateImageUrl(firstVideoUploaded)} /> : null}

            <RequestDetailsNote note={request.request.note} />
            <RenderWhen is={HAVE_ACTION_REQUEST_STATUSES.includes(request.request.status)}>
              <RequestDetailsActions
                hasResponse={request.hasResponse}
                hasDispatched={request.hasDispatched}
                onDispatchResponse={showDispatchConfirmPopup}
                isDispatchingRequest={dispatchRequest.isLoading}
                onCancelResponse={showCancelConfirmPopup}
                isCancelingRequest={cancelRequest.isLoading}
                onCreateResponse={setShowCreateResponseActions.setTrue}
                status={request.request.status}
                onGetResponseDetails={setShowResponseDetailsActions.setTrue}
              />
            </RenderWhen>
          </div>
        </RenderWhen>
      )}

      <ModalDrawer
        isOpen={showConversation}
        type="drawer"
        contentClassName="overflow-hidden pb-0"
        onClosed={handleCloseConversation}
      >
        <DrawerHeader
          onClose={handleCloseConversation}
          title={t('request_details.messages')}
          secondaryTitle={`Request number: ${id}`}
        />
        <Messages
          requestId={id}
          realTimesMessages={realTimesMessages}
          setSentMessage={setSentMessage}
        />
      </ModalDrawer>

      <ModalDrawer
        type="drawer"
        placement={DrawerPlacement.Bottom}
        isFullHeight
        isOpen={showCreateResponse}
      >
        <DrawerHeader
          title={t('request_details.create_response.request_response', { type: request?.request?.type })}
          onClose={setShowCreateResponseActions.setFalse}
        />
        <div className="h-max overflow-auto w-full rounded-xl bg-neutral-100 px-6 grid grid-cols-12 py-6">
          <CreateResponseForm
            requestType={request?.request?.type}
            onCancelRequest={showCancelConfirmPopup}
            isCancelingRequest={cancelRequest.isLoading}
            initialValues={{
              responses: request?.details?.map((part) => ({
                ...part,
                inStock: part.in_stock,
                image_files: part.image_files ?? [],
                deliveryDate: part.delivery_date,
                partNumber: part.part_number,
                lineTotal: part.line_total,
                unitPrice: part.unit_price,
              })),
            }}
            closeModal={setShowCreateResponseActions.setFalse}
          />
          <div className="col-span-3 px-6 flex flex-col gap-y-4">
            <Card className="h-auto text-neutral-600  bg-white p-6 border rounded-xl border-stroke-4">
              <div className="flex justify-between">
                <span>{t('request_details.reg_number')}</span>
                {request?.request.reg_num ? (
                  <div className="flex">
                    <div className="flex flex-col justify-center items-center bg-analogous-indigo-600 rounded-l-md w-6">
                      <Icon
                        name="stars"
                        size="xs"
                        color={Theme.colors.neutral500}
                      />
                      <span className="text-white text-[7px]">GB</span>
                    </div>
                    <span className="border text-neutral-900 border-l-0 border-neutral-900 rounded-r-md px-1 text-lg font-extrabold">
                      {request?.request.reg_num}
                    </span>
                  </div>
                ) : (
                  <span className="text-neutral-400">{t('request_details.not_provided')}</span>
                )}
              </div>
              <div className="flex justify-between mt-5 ">
                <span>{t('request_details.vin_number')}</span>
                {request?.request.vin_num ? (
                  <span className="text-neutral-800 font-bold">{request?.request.vin_num}</span>
                ) : (
                  <span className="text-neutral-400">{t('request_details.not_provided')}</span>
                )}
              </div>
            </Card>
            <Card
              header={{
                title: t('requests.parts_required'),
              }}
              className="h-auto text-sm bg-white px-6 py-3 border rounded-xl border-stroke-4"
            >
              {request?.details.map((part) => (
                <div
                  key={part.id}
                  className="flex items-start mb-4"
                >
                  <div className="inline-block rounded-lg w-10 h-10 bg-neutral-100 p-2.5">
                    <Icon
                      name="box"
                      size="sm"
                      color={Theme.colors.neutral500}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-neutral-800 font-bold">{part.description}</p>
                    <p className="text-neutral-500 text-sm">x{part.quantity}</p>
                  </div>
                </div>
              ))}
            </Card>
            <RequestDetailsNote
              note={request?.request?.note}
              title={t('request_details.note_from_customer')}
              hideIcon
            />
          </div>
        </div>
      </ModalDrawer>

      <ModalDrawer
        type="drawer"
        placement={DrawerPlacement.Bottom}
        isFullHeight
        isOpen={showResponseDetails}
      >
        <DrawerHeader
          title={t('shared.details')}
          onClose={setShowResponseDetailsActions.setFalse}
        />
        <div className="h-max overflow-auto w-full rounded-xl bg-neutral-100 px-6 grid grid-cols-12 py-6">
          <ResponseDetails id={id} />
          <div className="col-span-3 px-6 flex flex-col gap-y-4">
            <Card
              header={{
                title: t('requests.parts_required'),
              }}
              className="h-auto text-sm bg-white px-6 py-3 border rounded-xl border-stroke-4"
            >
              {request?.details.map((part) => (
                <div
                  key={part.id}
                  className="flex items-start mb-4"
                >
                  <div className="inline-block rounded-lg w-10 h-10 bg-neutral-100 p-2.5">
                    <Icon
                      name="box"
                      size="sm"
                      color={Theme.colors.neutral500}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-neutral-800 font-bold">{part.description}</p>
                    <p className="text-neutral-500 text-sm">x{part.quantity}</p>
                  </div>
                </div>
              ))}
            </Card>
            <RequestDetailsNote
              note={request?.request?.note}
              title={t('request_details.note_from_customer')}
              hideIcon
            />
          </div>
        </div>
      </ModalDrawer>

      <PopUp
        {...cancelPopup}
        submitText={t('request_details.cancel_request_confirm')}
        cancelText={t('shared.close')}
        submit={handleCancelRequest}
        isLoading={cancelRequest.isLoading}
        onClose={() => setCancelPopup({ isOpen: false })}
      />

      <PopUp
        {...dispatchPopup}
        submitText={t('request_details.dispatch_request_confirm')}
        secondarySubmitText={t('request_details.dispatch_request_confirm_without_notify')}
        cancelText={t('shared.cancel')}
        submit={() => handleDispatchRequest(true)}
        onClose={() => setDispatchPopup({ isOpen: false })}
        isLoading={dispatchRequest.variables?.notify && dispatchRequest.isLoading}
        secondaryLoading={!dispatchRequest.variables?.notify && dispatchRequest.isLoading}
        secondarySubmit={() => handleDispatchRequest(false)}
      />
    </Content>
  );
};

export default RequestDetails;
