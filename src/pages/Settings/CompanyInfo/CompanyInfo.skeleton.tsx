import { SKELETON_ITEMS_COUNT, SKELETON_INPUTS_COUNT } from './CompanyInfo.constants';

const SKELETONS = new Array(SKELETON_ITEMS_COUNT).fill('sk');
const INPUT_SKELETONS = new Array(SKELETON_INPUTS_COUNT).fill('sk');

export const CompanyInfoSkeleton = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="rounded-xl h-10 w-96 overflow-hidden mr-auto mb-14">
        <div className="relative w-full h-full overflow-hidden" />
      </div>
      <div
        // eslint-disable-next-line react/no-array-index-key
        className="relative flex flex-col bg-white border mb-32 h-28 w-80 border-stroke-4 rounded-xl shadow-xs"
      >
        <div className="skeleton-effect  overflow-hidden">
          <div className="w-32 h-7 rounded-sm absolute overflow-hidden top-7 left-6" />
          <div className="w-52  mt-3 h-5 rounded-sm absolute  overflow-hidden top-8 left-6" />
        </div>
      </div>
      <div className="relative grid grid-cols-3 2xl:grid-cols-4 xl:mb-40 mb-28 gap-8 overflow-hidden">
        {INPUT_SKELETONS.map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="relative flex flex-col bg-white border h-12 2xl:w-80 w-60 border-stroke-4 rounded-xl shadow-xs"
          >
            <div className="skeleton-effect flex overflow-hidden">
              <div className="w-4 mt-3 h-4 top-1 rounded-sm absolute overflow-hidden lg:left-4 left-6" />
              <div className="2xl:w-56 w-40 mt-3 h-4 top-1 rounded-sm absolute  overflow-hidden lg:left-7 left-9" />
            </div>
          </div>
        ))}
      </div>
      <div className="relative grid grid-cols-4  xl:gap-8 gap-6 overflow-hidden">
        {SKELETONS.map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="relative flex flex-col bg-white border h-28 2xl:w-80 w-60 border-stroke-4 rounded-xl shadow-xs"
          >
            <div className="skeleton-effect overflow-hidden">
              <div className="w-32 h-7 rounded-sm absolute overflow-hidden top-7 left-6" />
              <div className="2xl:w-52 w-48 mt-3 h-5 rounded-sm absolute  overflow-hidden top-8 left-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
