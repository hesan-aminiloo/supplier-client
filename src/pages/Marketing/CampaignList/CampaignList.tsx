import React from 'react';
import { useTranslation } from 'react-i18next';

// components
import RenderWhen from '@components/RenderWhen';
import { Content } from '@src/layouts/Content';

// local components
import {
  CampaignListEmptyState,
  CampaignListSkeleton,
  CampaignListItem,
  CampaignItemSkeleton,
} from '@src/pages/Marketing/CampaignList';
import { useCampaignList } from '@src/pages/Marketing/CampaignList/CampaignList.tools';
import PopUp from '@components/pop-up/PopUp';
import InfiniteScroll from 'react-infinite-scroll-component';

const CampaignList: React.FC = () => {
  const { t } = useTranslation();
  const {
    campaignList,
    handleDuplicateCampaign,
    handleDeleteCampaign,
    isLoading,
    isRefetching,
    deletePopup,
    duplicatePopup,
    isDeletingCampaign,
    isDuplicatingCampaign,
    dataLength,
    hasNextPage,
    fetchNextPage,
  } = useCampaignList();

  return (
    <Content
      pageTitle={t('side_menu.marketing')}
      canGoBack
    >
      <PopUp
        {...deletePopup}
        isLoading={isDeletingCampaign}
      />
      <PopUp
        {...duplicatePopup}
        isLoading={isDuplicatingCampaign}
      />
      <RenderWhen is={isLoading}>
        <CampaignListSkeleton />
      </RenderWhen>
      <RenderWhen is={!isLoading}>
        {campaignList.length === 0 ? (
          <CampaignListEmptyState />
        ) : (
          <InfiniteScroll
            dataLength={dataLength}
            hasMore={!!hasNextPage}
            next={() => fetchNextPage?.()}
            loader={<CampaignItemSkeleton />}
            className="w-full h-full px-10 pt-12 pb-8 bg-white rounded-xl flex-col justify-center items-center gap-4 inline-flex"
          >
            <div className="self-stretch text-gray-900 text-xl font-bold leading-7">
              {t('marketing.campaigns.campaign_list')}
            </div>
            {campaignList.map((campaign) => (
              <CampaignListItem
                campaign={campaign}
                key={campaign.id}
                onDelete={handleDeleteCampaign(campaign.id)}
                onDuplicate={handleDuplicateCampaign(campaign)}
              />
            ))}
            <RenderWhen is={isRefetching}>
              <CampaignItemSkeleton />
            </RenderWhen>
          </InfiniteScroll>
        )}
      </RenderWhen>
    </Content>
  );
};

export default CampaignList;
