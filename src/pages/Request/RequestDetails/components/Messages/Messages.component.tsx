import { FC, useMemo } from 'react';

// Utils
import clsx from 'clsx';
import { useStore } from 'zustand';
import { coreStore } from '@src/store/core';
import { AxiosResponse } from 'axios';
import { InfiniteData } from '@tanstack/react-query';

// local components
import SendMessage from '@src/pages/Request/RequestDetails/components/SendMessage';
import RenderWhen from '@components/RenderWhen';
import InfiniteScroll from 'react-infinite-scroll-component';
import MessageItem from './MessageItem.component';
import MessagesSkeleton, { MessageItemSkeleton } from './Messages.skeleton';
import MessagesEmptyState from './MessagesEmptyState';

// tools
import { convertMessages, getGroupMessageDate, useCreateMessage, useMessages } from './Messages.tools';

// Types
import { MessagesProps, MessagesResponse, PostMessageResponse } from './Messages.types';

// Styles
import styles from './Messages.module.scss';

export const Messages: FC<MessagesProps> = ({ requestId, realTimesMessages, setSentMessage }) => {
  const { data = [], isLoading, isFetching, fetchNextPage, hasNextPage } = useMessages(requestId);
  const { user } = useStore(coreStore);
  const createMessage = useCreateMessage(requestId);

  const { groupMessages, dataLength } = useMemo(() => {
    const pages = (data as InfiniteData<AxiosResponse<MessagesResponse>>)?.pages ?? [];
    const messagesFlat = pages?.map((page: AxiosResponse<MessagesResponse>) => page.data.messages).flat();
    return {
      groupMessages: convertMessages(messagesFlat, [], user?.id),
      dataLength: messagesFlat?.length ?? 0,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const allMessages = [...realTimesMessages, ...groupMessages];
  return (
    <div className="w-full h-full flex flex-col bg-neutral-100">
      <div
        className={clsx(styles.messages, 'messages w-full h-full flex flex-col-reverse overflow-auto pt-4')}
        id="scrollableDiv"
      >
        <RenderWhen is={!isLoading && !isFetching && allMessages.length === 0}>
          <MessagesEmptyState />
        </RenderWhen>
        <RenderWhen is={isLoading}>
          <MessagesSkeleton />
        </RenderWhen>
        <InfiniteScroll
          dataLength={dataLength}
          next={() => fetchNextPage()}
          hasMore={!!hasNextPage}
          loader={
            <div className="w-full mb-4">
              <MessageItemSkeleton />
            </div>
          }
          scrollableTarget="scrollableDiv"
          className="flex flex-col-reverse"
          inverse
        >
          {allMessages.map((groupMessage, index) => {
            return (
              <div
                className="w-full flex items-center flex-col relative mb-4"
                key={`${groupMessage.messages[0].msg_id}_group_by_date`}
              >
                <div className="text-center sticky -top-3 py-1.5 px-2.5 z-10 rounded-md bg-neutral-200 text-neutral-500 opacity-80 text-xs">
                  {getGroupMessageDate(groupMessage.created_at)}
                </div>
                <div
                  className={clsx('w-full flex items-center', {
                    'flex-col-reverse': realTimesMessages.length < index + 1,
                    'flex-col': realTimesMessages.length >= index + 1,
                  })}
                >
                  {groupMessage.messages.map((messageItem) => {
                    return (
                      <MessageItem
                        key={`${messageItem.msg_id}_group_by_sender`}
                        {...messageItem}
                        reverse={realTimesMessages.length < index + 1}
                        type={messageItem.user_id === user?.id ? 'sent' : 'received'}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
      <SendMessage
        isSending={createMessage.isLoading}
        onSubmit={(message, { reset }) => {
          createMessage.mutateAsync(message).then((res) => {
            const sentMessage = res.data as PostMessageResponse;
            setSentMessage(sentMessage);
            reset();
          });
        }}
      />
    </div>
  );
};

export default Messages;
