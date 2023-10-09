import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MARKETING_PAGE_PATH, successToast } from '@src/utils';
import { DELETE_CAMPAIGN, GET_CAMPAIGN_LIST, getDuplicateCampaignEndpoint } from '@src/app/endpoints/marketing';
import moment from 'moment';
import { PopUpProps } from '@components/pop-up/PopUp';
import { IGetCampaignListResponse } from '@src/pages/Marketing/CampaignList/CampaignList.types';
import { CampaignType } from '@src/types';
import { useNavigate } from 'react-router-dom';

const duplicateCampaign = async (campaignId: number) => {
  return axios.post(getDuplicateCampaignEndpoint(campaignId));
};

export const useDuplicateCampaign = () => {
  return useMutation(['duplicate-campaign'], (campaignId: number) => duplicateCampaign(campaignId));
};

const deleteCampaign = async (campaignId: number) => {
  return axios.delete(DELETE_CAMPAIGN.concat(campaignId.toString()));
};

export const useDeleteCampaign = () => {
  return useMutation([DELETE_CAMPAIGN], (campaignId: number) => deleteCampaign(campaignId));
};

const getCampaignList = async (page: number) => {
  return axios.get<IGetCampaignListResponse>(GET_CAMPAIGN_LIST, {
    method: 'GET',
    params: {
      page,
    },
  });
};

export const useCampaigns = () => {
  return useInfiniteQuery([GET_CAMPAIGN_LIST], ({ pageParam = 1 }) => getCampaignList(pageParam), {
    getNextPageParam: (response: AxiosResponse<IGetCampaignListResponse>) => {
      const { current_page, last_page } = response.data.meta;

      if (current_page === last_page) return false;
      return current_page + 1;
    },
  });
};

const isPast = (date: string) => {
  const inputTime = moment(date);
  const now = moment();

  return inputTime.isBefore(now);
};

export const useCampaignList = () => {
  const { data, isLoading, isRefetching, fetchNextPage, hasNextPage } = useCampaigns();
  const { t } = useTranslation();
  const duplicateCampaignMutation = useDuplicateCampaign();
  const deleteCampaignMutation = useDeleteCampaign();
  const campaignList = useMemo(() => {
    const campaignsPages = data?.pages.map((page) => page.data.data) ?? [];
    return campaignsPages?.reduce((acc, curr) => {
      return acc.concat(curr);
    }, []);
  }, [data]);
  const dataLength = campaignList.length;
  const queryClient = useQueryClient();
  const [deletePopup, setDeletePopup] = useState<PopUpProps>({});
  const [duplicatePopup, setDuplicatePopup] = useState<PopUpProps>({});
  const navigate = useNavigate();

  const invalidateCampaignList = () => {
    queryClient.invalidateQueries([GET_CAMPAIGN_LIST]);
  };

  const handleDeleteCampaign = (campaignId: number) => {
    deleteCampaignMutation.mutateAsync(campaignId).then(() => {
      successToast({ message: t('marketing.campaigns.campaign_deleted') });
      setDeletePopup({ isOpen: false });
      invalidateCampaignList();
    });
  };

  const showDeleteConfirmPopup = (campaignId: number) => () => {
    setDeletePopup({
      isOpen: true,
      title: t('marketing.campaigns.confirm_delete.title'),
      description: t('marketing.campaigns.confirm_delete.description'),
      submitText: t('marketing.campaigns.confirm_delete.submitText'),
      cancelText: t('shared.close'),
      submit: () => handleDeleteCampaign(campaignId),
      onClose: () => setDeletePopup({ isOpen: false }),
    });
  };

  const handleDuplicateCampaign = (campaign: CampaignType) => {
    if (isPast(campaign.schedule)) {
      navigate(MARKETING_PAGE_PATH, {
        state: {
          campaign,
        },
      });
    } else {
      duplicateCampaignMutation.mutateAsync(campaign.id).then(() => {
        successToast({ message: t('marketing.campaigns.campaign_duplicated') });
        invalidateCampaignList();
        setDuplicatePopup({ isOpen: false });
      });
    }
  };

  const showDuplicateConfirmPopup = (campaign: CampaignType) => () => {
    setDuplicatePopup({
      isOpen: true,
      title: t('marketing.campaigns.confirm_duplicate.title'),
      description: t('marketing.campaigns.confirm_duplicate.description'),
      submitText: t('marketing.campaigns.confirm_duplicate.submitText'),
      cancelText: t('shared.close'),
      submit: () => handleDuplicateCampaign(campaign),
      onClose: () => setDuplicatePopup({ isOpen: false }),
    });
  };
  return {
    campaignList,
    dataLength,
    fetchNextPage,
    hasNextPage,
    handleDuplicateCampaign: showDuplicateConfirmPopup,
    handleDeleteCampaign: showDeleteConfirmPopup,
    isLoading,
    isRefetching,
    duplicatePopup,
    isDuplicatingCampaign: duplicateCampaignMutation.isLoading,
    deletePopup,
    isDeletingCampaign: deleteCampaignMutation.isLoading,
  };
};

const isToday = (date: number) => {
  const today = moment();
  const dateToCheck = moment(date);

  return today.isSame(dateToCheck, 'day');
};

export const getCampaignSentDate = (date: number) => {
  if (isToday(date)) {
    const now = moment();
    const minutesAgo = now.diff(date, 'minutes');
    if (minutesAgo <= 1) {
      return '1 min ago';
    }
    if (minutesAgo < 60) {
      return `${minutesAgo} min ago`;
    }
  }
  return moment(date).format('DD/MM/YYYY hh:mm');
};
