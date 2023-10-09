// tools
import React from 'react';
import { Theme } from '@src/style';
import RenderWhen from '@components/RenderWhen';

// Local components
import { Card, DrawerHeader, Icon, ModalDrawer } from '@src/components';
// Hooks
import { useTranslation } from 'react-i18next';

// Types
import { useRequestPart } from '@src/pages/Request/RequestsList/RequestsList.tools';
import Loading from '@components/Loading';

interface Props {
  note: string;
  requestId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RequestRequiredParts: React.FC<Props> = ({ note, onClose, requestId, isOpen }) => {
  const { t } = useTranslation();
  const { data = [], isLoading } = useRequestPart(requestId ?? '');

  return (
    <ModalDrawer
      isOpen={isOpen}
      type="drawer"
      contentClassName="overflow-hidden pb-20"
      onClosed={onClose}
    >
      <DrawerHeader
        onClose={onClose}
        title={t('requests.parts_required')}
      />
      <RenderWhen is={isLoading}>
        <Loading />
      </RenderWhen>
      <RenderWhen is={data && !isLoading}>
        <div className="pt-6 px-6 flex flex-col gap-y-4 justify-between h-full">
          <Card
            header={{
              title: t('requests.parts_required'),
            }}
            className="h-auto text-sm bg-transparent px-6 py-3 border rounded-xl border-stroke-4"
          >
            <RenderWhen is={data.length > 0}>
              {data.map((part) => (
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
            </RenderWhen>
            <RenderWhen is={data.length === 0}>parts not found</RenderWhen>
          </Card>
          <Card
            header={{
              title: t('request_details.note'),
            }}
            className="flex text-sm bg-white px-6 py-3 border rounded-xl border-stroke-4"
          >
            <p className="text-neutral-500">{note && note !== 'undefined' ? note : ''}</p>
          </Card>
        </div>
      </RenderWhen>
    </ModalDrawer>
  );
};
