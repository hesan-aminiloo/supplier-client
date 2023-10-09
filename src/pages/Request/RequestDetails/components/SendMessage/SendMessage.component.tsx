import { ChangeEvent, FC, FormEvent, useState } from 'react';

// Utils
import colors from 'tailwindcss/colors';
import clsx from 'clsx';

// components
import { BasicInput } from '@components/text-fields/basic';
import { Button, Icon } from '@src/components';

// Types
import { SendMessageProps } from '@src/pages/Request/RequestDetails/components/SendMessage/index';
import { useTranslation } from 'react-i18next';
import RenderWhen from '@components/RenderWhen';

// Styles
import styles from './SendMessage.module.scss';

export const SendMessage: FC<SendMessageProps> = ({ onSubmit, isSending }) => {
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setMessage(evt.target.value);
  };

  const handleOnSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (message !== '') {
      onSubmit(message, { reset: () => setMessage('') });
    }
  };
  return (
    <form
      onSubmit={handleOnSubmit}
      className={clsx('w-full px-4 flex gap-4 items-center relative', styles['send-message'])}
    >
      <BasicInput
        className="rounded-3xl w-full h-11 px-3 focus:outline focus:outline-stroke-4 text-sm"
        placeholder={t('request_details.type_message')}
        value={message}
        onInput={handleOnChange}
        type="text"
      />
      <RenderWhen is={!!message}>
        <Button
          variant="text"
          size="sm"
          type="submit"
          className="absolute right-7 bg-white"
          loading={isSending}
        >
          <Icon
            name="arrow-right"
            color={colors.neutral['500']}
            className="cursor-pointer"
          />
        </Button>
      </RenderWhen>
    </form>
  );
};

export default SendMessage;
