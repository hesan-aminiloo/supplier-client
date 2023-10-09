import { CampaignType, PaginationResponse } from '@src/types';

export interface IGetCampaignListResponse {
  data: CampaignType[];
  meta: PaginationResponse;
}

export interface ICampaignListItemProps {
  campaign: CampaignType;
  onDuplicate: () => void;
  onDelete: () => void;
}
