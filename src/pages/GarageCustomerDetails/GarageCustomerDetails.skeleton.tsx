import { SKELETON_ITEMS_COUNT } from './GarageCustomerDetails.constants';

const SKELETONS = new Array(SKELETON_ITEMS_COUNT).fill('sk');

export const GarageCustomerDetailsSkeleton = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="rounded-xl h-10 w-96 overflow-hidden mr-auto mb-20">
        <div className="relative w-full h-full overflow-hidden" />
      </div>

      <div className="relative bg-white h-28 border border-stroke-4 rounded-xl shadow-xs">
        <div className="skeleton-effect overflow-hidden flex">
          <div className="w-16 h-16 mt-6 ml-6 !rounded-full overflow-hidden absolute" />
        </div>
        <div className="skeleton-effect overflow-hidden flex flex-col ml-28">
          <div className="w-36 h-7 mt-7 rounded-sm absolute" />
          <div className="w-28 h-5 mt-2 rounded-sm absolute" />
        </div>
      </div>

      <div className="relative bg-white p-6 h-32 border border-stroke-4 rounded-xl shadow-xs flex justify-between gap-x-6 overflow-hidden">
        {SKELETONS.map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="relative w-1/4"
          >
            <div className="skeleton-effect overflow-hidden flex flex-col">
              <div className="w-6 h-6 rounded-sm absolute" />
              <div className="w-2/6 h-5 mt-2 rounded-sm absolute" />
              <div className="w-5/6 h-5 mt-2 rounded-sm absolute" />
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-8 h-44 flex justify-between gap-x-8 overflow-hidden">
        {SKELETONS.map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="relative w-1/4 bg-white border border-stroke-4 rounded-xl shadow-xs"
          >
            <div className="skeleton-effect overflow-hidden flex flex-col">
              <div className="w-7 h-7 rounded-sm absolute mt-6 ml-6" />
              <div className="w-2/5 h-7 rounded-sm absolute mt-3.5 ml-6" />
            </div>
            <div className="skeleton-effect overflow-hidden flex justify-between gap-x-2 mt-28">
              <div className="w-11 h-11 mt-2 border rounded-xl absolute ml-6 overflow-hidden" />
              <div className="w-11 h-11 mt-2 border rounded-xl absolute overflow-hidden" />
              <div className="w-32 h-11 mt-2 border rounded-xl absolute mr-6 overflow-hidden" />
            </div>
          </div>
        ))}
      </div>

      <div className="relative w-1/2 h-32 mt-16 flex gap-x-8">
        <div className="skeleton-effect">
          <div className="w-[120px] h-[36px] absolute" />
        </div>
        <div className="skeleton-effect flex">
          <div className="w-12 h-12 absolute mt-20 border rounded-xl overflow-hidden" />
        </div>
        <div className="skeleton-effect flex flex-col">
          <div className="w-14 h-5 absolute mt-20 ml-16" />
          <div className="w-12 h-6 absolute mt-1 ml-16" />
        </div>
        <div className="skeleton-effect flex">
          <div className="w-12 h-12 absolute mt-20 ml-40 border rounded-xl overflow-hidden" />
        </div>
        <div className="skeleton-effect flex flex-col">
          <div className="w-14 h-5 absolute mt-20 ml-16 ml-56" />
          <div className="w-12 h-6 absolute mt-1 ml-16 ml-56" />
        </div>
        <div className="skeleton-effect flex">
          <div className="w-12 h-12 absolute mt-20 ml-80 border rounded-xl overflow-hidden" />
        </div>
        <div className="skeleton-effect flex flex-col">
          <div className="w-14 h-5 absolute mt-20 ml-96" />
          <div className="w-12 h-6 absolute mt-1 ml-96" />
        </div>
      </div>
    </div>
  );
};
