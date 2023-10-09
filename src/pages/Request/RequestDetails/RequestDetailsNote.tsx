import React from 'react';
import { useTranslation } from 'react-i18next';

// components
import { Card, Icon } from '@src/components';

// styles
import { Theme } from '@src/style';

// types
import { RequestDetailsNoteProps } from '@src/pages/Request/RequestDetails';

const cardHeader = {
  icon: (
    <Icon
      name="edit"
      color={Theme.colors.neutral500}
    />
  ),
  title: 'request_details.note',
  className: 'border-bottom-stroke-4',
};

export const RequestDetailsNote: React.FC<RequestDetailsNoteProps> = ({ note, title, hideIcon }) => {
  const { t } = useTranslation();
  return (
    <Card
      header={{
        ...cardHeader,
        icon: hideIcon ? null : cardHeader.icon,
        title: title ?? t(cardHeader.title),
      }}
      className="flex h-auto w-full text-sm bg-white items-start justify-between px-6 py-3 border rounded-xl border-stroke-4"
    >
      <p>{note && note !== 'undefined' ? note : ''}</p>
    </Card>
  );
};

export default RequestDetailsNote;
