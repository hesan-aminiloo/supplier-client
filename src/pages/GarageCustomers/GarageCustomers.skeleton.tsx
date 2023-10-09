import { SKELETON_ITEMS_COUNT } from './GarageCustomers.constants';

const SKELETONS = new Array(SKELETON_ITEMS_COUNT).fill('sk');

export const GarageCustomersSkeleton = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="rounded-xl h-10 w-96 overflow-hidden mr-auto mb-20">
        <div className="relative w-full h-full overflow-hidden" />
      </div>

      <div className="relative grid grid-cols-3 2xl:grid-cols-4 grid-rows-2 gap-8 overflow-hidden">
        {SKELETONS.map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="relative flex flex-col bg-white border h-72 border-stroke-4 rounded-xl shadow-xs"
          >
            <div className="skeleton-effect overflow-hidden">
              <div className="w-24 mt-4 h-24 !rounded-full overflow-hidden absolute top-4 left-1/2 -translate-x-1/2" />
              <div className="w-36 mt-8 h-4 rounded-sm absolute top-2 left-1/2 -translate-x-1/2" />
              <div className="w-52 mt-3 h-4 rounded-sm absolute top-1 left-1/2 -translate-x-1/2" />
              <div className="w-full mt-3 h-16 rounded-sm absolute -bottom-7 left-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
