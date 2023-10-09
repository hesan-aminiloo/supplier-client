/* eslint-disable react/no-array-index-key */
import { SKELETON_ITEMS_COUNT } from './Notifications.constants';

const SKELETONS = new Array(SKELETON_ITEMS_COUNT).fill('sk');

export const NotificationsSkeleton = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="relative flex flex-col gap-y-4 overflow-hidden">
        {SKELETONS.map((_, index) => (
          <div
            key={index}
            className="relative bg-white border h-[88px] border-stroke-4 rounded-xl shadow-xs flex items-center"
          >
            <div className="skeleton-effect !relative !w-12 !h-12 ml-6">
              <div className="w-full h-full !rounded-full overflow-hidden" />
            </div>
            <div className="skeleton-effect !relative !w-4/5 ml-6">
              <div className="w-full h-4 mt-5 rounded-sm" />
              <div className="w-1/3 mt-3 h-4 rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
