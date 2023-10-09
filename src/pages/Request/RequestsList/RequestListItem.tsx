/* eslint-disable camelcase */
// tools
import clsx from 'clsx';
import React, { MouseEvent, useEffect, useState } from 'react';
import moment from 'moment';
import { getRequestStatusColor, getRequestStatusText } from '@src/pages/Request/RequestDetails';
import { Theme } from '@src/style';
import { camelToKebabCase, generateImageUrl, useBoolean } from '@src/utils';
import RenderWhen from '@components/RenderWhen';

// Local components
import Avatar from '@components/avatar/Avatar';
import { Button, DrawerHeader, Icon, ModalDrawer } from '@src/components';
import { Messages, useRealTimeMessages } from '@src/pages/Request/RequestDetails/components/Messages';
// Hooks
import { useTranslation } from 'react-i18next';

// Types
import { RequestRequiredParts } from '@src/pages/Request/RequestsList/RequestRequiredParts';
import type { RequestItemPropsI } from './Requests.types';

// styles
import styles from './Requests.module.scss';

export const RequestListItem: React.FC<RequestItemPropsI> = ({ request, onClick }) => {
  const { t } = useTranslation();
  // eslint-disable-next-line camelcase
  const {
    id,
    requestType,
    reg_num,
    countMsg,
    countUnreadMsg,
    status,
    note,
    name,
    logo,
    created_at,
    branchName,
    vin_num,
    dispatched_at,
  } = request;
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [showConversation, setShowConversationActions] = useBoolean(false);
  const [showResponseDetails, setShowResponseDetailsActions] = useBoolean(false);
  const { realTimesMessages, setRealTimeMessages, setSentMessage, conversationStatus, setConversationStatus } =
    useRealTimeMessages(id);

  useEffect(() => {
    if (countMsg > 0) {
      setConversationStatus('hasMessages');
    }
    if (Number(countUnreadMsg) > 0) {
      setConversationStatus('hasNewMessages');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowParts = (event: MouseEvent) => {
    event.stopPropagation();
    setSelectedRequestId(request.id);
    setShowResponseDetailsActions.setTrue();
  };

  const handleShowConversation = (event: MouseEvent) => {
    event.stopPropagation();
    setSelectedRequestId(request.id);
    setShowConversationActions.setTrue();
    setRealTimeMessages([]);
    if (conversationStatus === 'hasNewMessages') {
      setConversationStatus('hasMessages');
    }
  };
  const statusColor = camelToKebabCase(getRequestStatusColor(status));

  const handleCloseConversation = () => {
    setSelectedRequestId(null);
    setShowConversationActions.setFalse();
    if (conversationStatus === 'hasNewMessages') {
      setConversationStatus('hasMessages');
    }
  };

  let labelHoverText = '';
  if (status === 'confirmed' && !dispatched_at) {
    labelHoverText = 'Confirmed, Dispatch it';
  }
  if (dispatched_at) {
    labelHoverText = `${t('request_details.dispatched_at')} ${moment(dispatched_at).format('DD/MM/YYYY HH:mm')}`;
  }
  return (
    <>
      <tr
        onClick={onClick}
        role="button"
        onKeyUp={onClick}
        tabIndex={0}
        className={clsx(
          styles['request-item'],
          'flex justify-between w-full text-sm bg-white items-center border rounded-xl border-stroke-4'
        )}
      >
        <td className="w-16 pl-4 font-medium">{id}</td>
        <td className="w-20 capitalize font-medium">{requestType}</td>
        <td className="h-full w-56 flex items-center text-ellipsis whitespace-nowrap overflow-hidden font-medium">
          <Avatar
            size="md"
            userName={name}
            src={logo ? generateImageUrl(logo) : ''}
          />
          <div className="ml-3">
            <abbr
              className="no-underline"
              title={name}
            >
              <p className="w-44 text-ellipsis overflow-hidden whitespace-nowrap">{name}</p>
            </abbr>
            <abbr
              className="no-underline"
              title={branchName}
            >
              <p className="text-neutral-500">{branchName}</p>
            </abbr>
          </div>
        </td>
        <td className="w-36 font-medium">
          <div>{reg_num && reg_num !== 'undefined' ? reg_num : ''}</div>
          <div>{vin_num && vin_num !== 'undefined' ? vin_num : ''}</div>
        </td>
        <td className="w-44">
          <abbr
            title={labelHoverText}
            className={`text-${statusColor}-500 w-max py-1 px-3 rounded-3xl bg-${statusColor}-50 flex gap-2 items-center no-underline`}
          >
            {((!dispatched_at && status === 'confirmed') || status === 'response_required') && (
              <Icon
                size="xs"
                name="danger"
                className="mt-0/5"
                color={status === 'response_required' ? Theme.colors.warning500 : Theme.colors.success500}
              />
            )}
            {getRequestStatusText(status)}
          </abbr>
        </td>
        <td className="text-ellipsis w-36 font-medium">{moment(created_at).format('DD/MM/YYYY, H:mm')}</td>
        <td className="w-56 gap-x-2 flex">
          <Button
            onClick={handleShowParts}
            rightIcon={
              <Icon
                name="box"
                color={Theme.colors.primary500}
                size="sm"
                className="ml-2"
              />
            }
            className="w-40 shadow-xs h-11 flex border-none p-1.5 items-center justify-center"
            variant="secondary"
            color="primary"
          >
            {t('requests.parts_required')}
          </Button>

          <Button
            variant="tertiary"
            color="neutral"
            onClick={handleShowConversation}
            className="relative"
          >
            <Icon
              name="messages"
              size="sm"
              color={Theme.colors.neutral500}
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
        </td>
      </tr>

      <ModalDrawer
        isOpen={showConversation}
        type="drawer"
        contentClassName="overflow-hidden pb-0"
        onClosed={handleCloseConversation}
      >
        <DrawerHeader
          onClose={handleCloseConversation}
          title={t('request_details.messages')}
          secondaryTitle={`Request number: ${selectedRequestId}`}
        />
        <Messages
          requestId={selectedRequestId ?? ''}
          realTimesMessages={realTimesMessages}
          setSentMessage={setSentMessage}
        />
      </ModalDrawer>

      <RequestRequiredParts
        requestId={selectedRequestId}
        isOpen={showResponseDetails}
        onClose={() => {
          setSelectedRequestId(null);
          setShowResponseDetailsActions.setFalse();
        }}
        note={note}
      />
    </>
  );
};
