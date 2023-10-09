import React, { useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { ICampaignListItemProps } from '@src/pages/Marketing/CampaignList';
import { Button, Card, Image } from '@src/components';
import DropDownCampaignCard from '@src/pages/Marketing/CampaignList/components/DropDown';
import { getCampaignSentDate } from '@src/pages/Marketing/CampaignList/CampaignList.tools';

import styles from './CampaignList.module.scss';

export const CampaignListItem: React.FC<ICampaignListItemProps> = ({ campaign, onDelete, onDuplicate }) => {
  const { t } = useTranslation();
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  return (
    <div className="self-stretch px-6 py-5 bg-white rounded-xl shadow border border-black border-opacity-5 justify-between items-center gap-5 inline-flex">
      <div
        className={clsx('grow shrink basis-0 h-20 justify-start items-center gap-4 flex', styles['campaign-list-item'])}
      >
        <Image
          size="lg"
          src={campaign.image}
          alt={campaign.title}
          className="w-28 h-20 rounded-lg overflow-hidden"
        />
        <div
          className={clsx(
            'grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex',
            styles['campaign-list-item__details']
          )}
        >
          <div className="self-stretch text-blue-500 text-sm font-semibold leading-tight">
            {t('marketing.campaigns.sent')} {getCampaignSentDate(campaign.created_at)}
          </div>
          <div className="self-stretch h-14 flex-col justify-start items-start gap-1 flex overflow-hidden">
            <div className="text-gray-900 text-lg font-bold leading-normal">{campaign.title}</div>
            <div className="self-stretch text-gray-700 text-base font-normal leading-normal truncate w-full">
              {campaign.itemDescription}
            </div>
          </div>
        </div>
      </div>

      <DropDownCampaignCard
        isOpen={isOpenDropDown}
        toggle={() => setIsOpenDropDown(!isOpenDropDown)}
        onClose={() => setIsOpenDropDown(false)}
      >
        <Card className="w-[123px] absolute flex flex-col top-5 z-10 right-5 shadow-md px-2 py-2">
          <Button
            variant="tertiary"
            size="sm"
            className="text-left px-2 text-neutral-600 py-2 border-0 hover:bg-neutral-50"
            onClick={onDuplicate}
          >
            {t('marketing.campaigns.duplicate')}
          </Button>
          <Button
            variant="tertiary"
            size="sm"
            className="text-left !text-destructive-600 px-2 py-2 border-0 hover:bg-neutral-50"
            onClick={onDelete}
          >
            {t('marketing.campaigns.delete')}
          </Button>
        </Card>
      </DropDownCampaignCard>
    </div>
  );
};
