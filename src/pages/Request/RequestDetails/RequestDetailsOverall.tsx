import React from 'react';
import { useTranslation } from 'react-i18next';

// components
import { Avatar, Card, Icon, Badge } from '@src/components';

// styles
import { Theme } from '@src/style';

// types
import { IRequest } from '@src/types';

// tools
import {
  getRequestStatusColor,
  getRequestStatusIcon,
  getRequestStatusText,
} from '@src/pages/Request/RequestDetails/RequestDetails.tools';
import moment from 'moment/moment';
import { camelToKebabCase, generateImageUrl } from '@src/utils';

export const RequestDetailsOverall: React.FC<IRequest> = ({
  garageLogo,
  garageName,
  created_at,
  document,
  reg_num,
  vin_num,
  status,
}) => {
  const { t } = useTranslation();
  const statusColor = getRequestStatusColor(status);
  return (
    <Card className="flex h-24 w-full text-sm bg-white items-center justify-between px-6 py-3 border rounded-xl border-stroke-4">
      <div className="flex items-center">
        <Avatar
          size="md"
          userName={garageName}
          src={garageLogo ? generateImageUrl(garageLogo) : ''}
        />
        <div className="ml-3">
          <p className="text-neutral-500">{t('request_details.garage')}</p>
          <p className="text-primary-700">{garageName}</p>
        </div>
      </div>
      <div className="flex items-center ">
        <Badge
          variant="tertiary"
          color="neutral"
          size="sm"
        >
          <Icon
            name="document-text"
            size="sm"
            color={Theme.colors.neutral500}
          />
        </Badge>
        <div className="ml-3">
          <p className="text-neutral-500">{t('request_details.document')}</p>
          <p className="text-neutral-700">{document}</p>
        </div>
      </div>
      <div className="flex items-center ">
        <Badge
          variant="tertiary"
          color="neutral"
          size="sm"
        >
          <Icon
            name="calendar-1"
            size="sm"
            color={Theme.colors.neutral500}
          />
        </Badge>
        <div className="ml-3">
          <p className="text-neutral-500">{t('request_details.date')}</p>
          <p className="text-neutral-700">{moment(created_at).format('DD/MM/YYYY, H:mm')}</p>
        </div>
      </div>
      <div className="flex items-center ">
        <Badge
          variant="tertiary"
          color="neutral"
          size="sm"
        >
          <Icon
            name="car"
            size="sm"
            color={Theme.colors.neutral500}
          />
        </Badge>
        <div className="ml-3">
          <p className="text-neutral-500">{t('request_details.reg_number')}</p>
          <p className="text-neutral-700">{reg_num && reg_num !== 'undefined' ? reg_num : '-'}</p>
        </div>
      </div>
      <div className="flex items-center ">
        <Badge
          variant="tertiary"
          color="neutral"
          size="sm"
        >
          <Icon
            name="barcode"
            size="sm"
            color={Theme.colors.neutral500}
          />
        </Badge>
        <div className="ml-3">
          <p className="text-neutral-500">{t('request_details.vin_code')}</p>
          <p className="text-neutral-700">{vin_num && vin_num !== 'undefined' ? vin_num : '-'}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Badge
          variant="tertiary"
          color={statusColor || 'neutral'}
          size="sm"
        >
          <Icon
            name={getRequestStatusIcon(status)}
            size="sm"
            color={Theme.colors[`${statusColor || 'primary'}500`]}
          />
        </Badge>
        <div className="ml-3">
          <p className="text-neutral-500">{t('request_details.status')}</p>
          <p className={`text-${camelToKebabCase(statusColor)}-500 w-max rounded-3xl`}>
            {getRequestStatusText(status)}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default RequestDetailsOverall;
