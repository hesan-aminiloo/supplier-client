import { CampaignType } from '@src/types';
import { CreateNotifData } from './CreateNotif.types';

export const getCreateNotifDefaultValues = (initialData: CampaignType | undefined): CreateNotifData => {
  return {
    date: null,
    title: initialData?.title ?? '',
    description: initialData?.description ?? '',
    item_description: initialData?.itemDescription ?? '',
    image: initialData?.image ?? null,
  };
};
