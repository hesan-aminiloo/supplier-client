import React from 'react';

// components
import { Button, Icon } from '@src/components';

// styles
import { Theme } from '@src/style';

// types
import { RequestDetailsHeaderOptionsProps } from '@src/pages/Request/RequestDetails/RequestDetails.types';

export const RequestDetailsHeaderOptions: React.FC<RequestDetailsHeaderOptionsProps> = ({ onOpenConversation }) => {
  return (
    <>
      <Button
        variant="tertiary"
        onClick={onOpenConversation}
      >
        <Icon
          name="messages"
          size="sm"
          color={Theme.colors.primary500}
        />
      </Button>
    </>
  );
};

export default RequestDetailsHeaderOptions;
