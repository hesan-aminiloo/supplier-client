import * as React from 'react';

// utils
import { useTranslation } from 'react-i18next';

// types
import { ResponseDetailsProps } from '@src/pages/Request/RequestDetails/ResponseDetails/ResponseDetails.types';
import { getRequestTotalAmount, useRequestResponseDetails } from '@src/pages/Request/RequestDetails';
import { Input } from '@components/text-fields';
import RenderWhen from '@components/RenderWhen';
import { IRequestResponseDetails } from '@src/types';
import { RESPONSE_HEADER_ELEMENTS } from '@src/pages/Request/RequestDetails/ResponseDetails/ResponseDetails.constants';
import { Badge, Card, Icon } from '@src/components';
import Loading from '@components/Loading';
import { Theme } from '@src/style';
import moment from 'moment';

export const ResponseDetails: React.FunctionComponent<ResponseDetailsProps> = ({ id }) => {
  const { data, isLoading: isLoadingResponseDetails } = useRequestResponseDetails(id);
  const { t } = useTranslation();
  const responseDetails = data as IRequestResponseDetails | undefined;
  let total = 0;
  if (responseDetails?.responseDetails) {
    total = getRequestTotalAmount(
      (responseDetails?.responseDetails ?? []).map((response) => ({
        quantity: response.quantity,
        unitPrice: response.unit_price,
      })) ?? []
    );
  }
  return (
    <div className="gap-y-3 col-span-9">
      <RenderWhen is={isLoadingResponseDetails}>
        <Loading />
      </RenderWhen>
      <RenderWhen is={!!responseDetails}>
        <div className="w-full grid grid-cols-4 gap-x-8 gap-y-6">
          <h3 className="text-xl font-bold mb-6 text-neutral-800 flex justify-between items-center">
            {t('request_details.create_response.response_header')}
          </h3>
        </div>
        <div className="pb-8 border-b-2 border-stroke-4 w-full grid grid-cols-4 gap-x-8 gap-y-6">
          {RESPONSE_HEADER_ELEMENTS.map((element) => {
            return (
              <Input
                key={element.name}
                name={`headers.${element.name}`}
                label={t(element.label)}
                placeholder={t(element.placeholder)}
                type={element.type}
                className={element.className}
                value={responseDetails?.responseHeader?.[0]?.[element.name]?.toString()?.replace?.('_', ' ') ?? ''}
                readOnly
              />
            );
          })}
        </div>
        <div className="mt-8 w-full grid grid-cols-4 gap-x-8 gap-y-6">
          <h3 className="text-xl font-bold mb-6 text-neutral-800 flex justify-between items-center">
            {t('request_details.create_response.response_details')}
          </h3>
        </div>
        <div className="flex flex-col justify-between items-center gap-y-6 pb-8 border-b-2 border-stroke-4">
          {responseDetails?.responseDetails.map((response) => {
            return (
              <Card
                key={response.description}
                header={{
                  title: response.description ?? '-',
                }}
                className="w-full h-auto text-sm bg-white px-6 py-3 border rounded-xl border-stroke-4"
              >
                <div className="flex flex-wrap justify-start">
                  <div className="flex flex-1 flex-col gap-y-2">
                    <p className="text-neutral-500 text-sm">{t('request_details.part.number')}</p>
                    <p>{response.part_number ?? '-'}</p>
                  </div>
                  <div className="flex flex-1 flex-col gap-y-2">
                    <p className="text-neutral-500 text-sm">{t('request_details.part.quantity')}</p>
                    <p className="text-neutral-700">x{response.quantity}</p>
                  </div>
                  <div className="flex flex-1 flex-col gap-y-2">
                    <p className="text-neutral-500 text-sm">{t('request_details.part.unit_price')}</p>
                    <p className="text-neutral-700">
                      {response.unit_price ? `${t('shared.currency')} ${response.unit_price}` : '-'}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col gap-y-2">
                    <p className="text-neutral-500 text-sm">{t('request_details.part.line_total')}</p>
                    <p className="text-neutral-700">
                      {response.line_total ? `${t('shared.currency')} ${response.line_total}` : '-'}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col gap-y-2">
                    <p className="text-neutral-500 text-sm">{t('request_details.part.delivery_date')}</p>
                    <p className="text-neutral-700">
                      {moment(response.delivery_date?.toString?.()).format('DD/MM/YYYY')}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col gap-y-2">
                    <p className="text-neutral-500 text-sm">{t('request_details.part.in_stock')}</p>
                    <p className="text-neutral-700">{[true, 1, '1'].includes(response.in_stock) ? 'Yes' : 'No'}</p>
                  </div>
                </div>
                <div className="flex mt-8">
                  <div className="flex flex-1 flex-col gap-y-2">
                    <p className="text-neutral-500 text-sm">{t('request_details.note')}</p>
                    <p className="text-neutral-700">{response.notes ?? '-'}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="flex flex-col justify-between items-center gap-y-6 pb-8 mt-8">
          <Card className="w-full text-sm bg-white px-6 py-3 border rounded-xl border-stroke-4 h-24 flex items-center">
            <div className="flex justify-start gap-4 items-center">
              <Badge
                variant="tertiary"
                color="primary"
                size="sm"
              >
                <Icon
                  name="receipt-item"
                  size="sm"
                  color={Theme.colors.neutral500}
                />
              </Badge>
              <div className="flex flex-1 flex-col gap-y-0.5">
                <p className="text-neutral-500 text-sm">
                  {t('request_details.create_response.total')} {t('request_details.create_response.excl_vat')}
                </p>
                <p>{`£${total.toFixed(2)}`}</p>
              </div>
            </div>
          </Card>
        </div>
      </RenderWhen>
    </div>
  );
};

export default ResponseDetails;
