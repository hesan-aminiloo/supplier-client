/* eslint-disable react/no-array-index-key */
import { SKELETON_ITEMS_COUNT } from './CampaignList.constants';

const SKELETONS = new Array(SKELETON_ITEMS_COUNT).fill('sk');
export const CampaignItemSkeleton = () => {
  return (
    <div className="w-full relative bg-white border h-28 border-stroke-4 rounded-xl shadow-xs flex items-center">
      <div className="skeleton-effect !relative !w-28 !h-20 ml-6">
        <div className="w-full h-full !rounded-lg overflow-hidden" />
      </div>
      <div className="skeleton-effect !relative !w-4/5 ml-6">
        <div className="w-1/5 mt-5 h-4 rounded-sm" />
        <div className="w-3/5 h-4 mt-3 rounded-sm" />
        <div className="w-4/5 mt-3 h-4 rounded-sm" />
      </div>
    </div>
  );
};

export const CampaignListSkeleton = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="relative flex flex-col gap-y-4 overflow-hidden">
        {SKELETONS.map((_, index) => (
          <CampaignItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
