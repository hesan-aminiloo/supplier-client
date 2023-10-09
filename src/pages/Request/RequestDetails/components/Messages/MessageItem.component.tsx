import { FC } from 'react';
import clsx from 'clsx';
import { generateImageUrl, getTimeInTimeZone } from '@src/utils';

// Local components
import Avatar from '@components/avatar/Avatar';

// Types
import { ConversationMessage } from './Messages.types';

// Styles
import styles from './Messages.module.scss';

export const MessageItem: FC<ConversationMessage & { reverse: boolean }> = (props) => {
  const { account_logo, type, messages, username, first_name, last_name, created_at, reverse } = props;
  const getMessageSenderName = () => {
    if (!first_name && !last_name) {
      return username;
    }
    return `${first_name ?? ''} ${last_name ?? ''}`;
  };
  const messageCreatedAt = getTimeInTimeZone(created_at);
  return (
    <div className={clsx('mt-5', styles['messages-item'], styles[`messages-item__${type}`])}>
      {type === 'received' ? (
        <div className={clsx('mt-6', styles['messages-item--avatar'])}>
          <Avatar
            userName={username}
            size="lg"
            src={generateImageUrl(`/storage/Logo/${account_logo}`)}
            onClick={() => null}
          />
        </div>
      ) : null}
      <div className={clsx(styles['messages-item--box'], styles[`messages-item--box__${type}`])}>
        <div className={clsx('text-neutral-400 mb-2 text-sm font-thin', styles[`message-details__${type}`])}>
          {getMessageSenderName()}, {messageCreatedAt}
        </div>
        <div
          className={clsx('flex gap-y-2', {
            'flex-col-reverse': reverse,
            'flex-col': !reverse,
          })}
        >
          {messages.map((message, index) => (
            <abbr
              key={`${message.msg_id}_message_item`}
              className="no-underline"
              title={`sent at ${getTimeInTimeZone(message.created_at)}`}
            >
              <div
                className={clsx(
                  'border-stroke-4 bg-white',
                  styles['text-container'],
                  styles[`text-container__${type}`],
                  {
                    '!rounded-tr-none': (index !== 0 || index === messages.length - 1) && type === 'sent',
                    '!rounded-tl-none': (index !== 0 || index === messages.length - 1) && type === 'received',
                  }
                )}
              >
                <p>{message.message}</p>
              </div>
            </abbr>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
