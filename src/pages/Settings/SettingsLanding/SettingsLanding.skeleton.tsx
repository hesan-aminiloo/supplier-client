import { SKELETON_ITEMS_COUNT } from './SettingsLanding.constants';

const SKELETONS = new Array(SKELETON_ITEMS_COUNT).fill('sk');

export const SettingsLandingSkeleton = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="rounded-xl h-10 w-96 overflow-hidden mr-auto mb-14">
        <div className="relative w-full h-full overflow-hidden" />
      </div>

      <div className="relative grid grid-cols-3 grid-rows-2 gap-8 overflow-hidden">
        {SKELETONS.map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="relative flex flex-col bg-white border h-64 border-stroke-4 rounded-xl shadow-xs"
          >
            <div className="skeleton-effect overflow-hidden">
              <div className="w-32 h-7 rounded-sm absolute top-7 left-6" />
              <div className="w-48 mt-4 h-7 rounded-sm absolute top-6 left-6" />
              <div className="w-64 mt-8 h-4 rounded-sm absolute top-6 left-6" />
              <div className="w-52 mt-3 h-4 rounded-sm absolute top-6 left-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
