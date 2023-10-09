import React from 'react';
import { useTranslation } from 'react-i18next';

// components
import { Card, Icon } from '@src/components';

// styles
import { Theme } from '@src/style';
import { RequestDetailsPartsReturnedProps } from '@src/pages/Request/RequestDetails/RequestDetails.types';

const cardHeader = {
  icon: (
    <Icon
      name="box"
      color={Theme.colors.neutral500}
    />
  ),
  title: 'request_details.parts_returned',
  className: 'border-bottom-stroke-4',
};

export const RequestDetailsPartsReturned: React.FC<RequestDetailsPartsReturnedProps> = ({ returnedParts }) => {
  const { t } = useTranslation();
  return (
    <Card
      header={{
        ...cardHeader,
        title: t(cardHeader.title),
      }}
      className="flex h-auto w-full text-sm bg-white items-start justify-between px-6 py-3 border rounded-xl border-stroke-4"
    >
      <div className="w-full grid grid-cols-4 gap-6">
        {returnedParts.map((part) => (
          <div
            key={part.id}
            className="bg-indigo-50 flex flex-col p-5 rounded-2xl h-20"
          >
            <p className="text-indigo-700">{part.description}</p>
            <p className="text-indigo-400 font-light text-sm">x{part.quantity}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RequestDetailsPartsReturned;
