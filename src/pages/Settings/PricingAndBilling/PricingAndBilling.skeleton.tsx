import { TableSkeleton } from '@src/pages/Stats/assets';

const PricingAndBillingSkeleton = () => {
  return (
    <>
      <div className="relative flex gap-6 overflow-hidden my-10">
        {[1, 2, 3, 4].map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="relative bg-white flex-1 rounded-xl h-28 flex gap-4 items-center justify-start"
          >
            <div className="skeleton-effect !left-20 flex flex-col gap-2 justify-center">
              <div className="w-12 h-2 ml-2 rounded-2xl overflow-hidden" />
              <div className="w-16 h-4 ml-2 rounded-3xl overflow-hidden" />
            </div>
          </div>
        ))}
      </div>
      <div className="relative grid grid-cols-10 gap-8 lg:gap-4 overflow-hidden my-10">
        {[1, 2].map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="relative bg-white col-span-2 rounded-xl h-28 flex gap-4 items-center justify-start"
          >
            <div className="skeleton-effect !left-6 flex gap-2 items-center">
              <div className="w-12 h-12 rounded-xl overflow-hidden" />
            </div>
            <div className="skeleton-effect !left-20 flex flex-col gap-2 justify-center">
              <div className="w-12 h-2 ml-2 rounded-2xl overflow-hidden" />
              <div className="w-16 h-4 ml-2 rounded-3xl overflow-hidden" />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white relative col-span-2 rounded-xl h-80 p-6 overflow-hidden">
        <div className="skeleton-effect !left-6 !top-16 overflow-hidden">
          <TableSkeleton />
        </div>
      </div>
    </>
  );
};

export default PricingAndBillingSkeleton;
