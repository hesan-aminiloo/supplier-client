import {
  AreaChartSkeleton,
  FullInlinePieChartSkeleton,
  FullOutlinePieChartSkeleton,
  GraphPieChartSkeleton,
  LineChartSkeleton,
  RevenueLineChartSkeleton,
  TableSkeleton,
} from '@src/pages/Stats/assets';
import { STATS_CARDS } from './Stats.constants';

export const StatsSkeleton = () => {
  return (
    <div className="relative overflow-hidden mb-10">
      <div className="flex relative flex-col w-full gap-y-6 mt-12">
        <div className="relative grid grid-cols-10 gap-8 lg:gap-4 overflow-hidden">
          {STATS_CARDS.map((_, index) => (
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
        <div className="w-full grid grid-cols-3 gap-6">
          <div className="col-span-2 grid grid-cols-2 gap-6 auto-rows-min">
            <div className="bg-white relative col-span-2 rounded-xl h-80 p-4">
              <div className="skeleton-effect !top-6 !left-6 flex flex-col gap-2 justify-start">
                <div className="w-12 h-2 rounded-2xl overflow-hidden" />
                <div className="w-16 h-4 rounded-3xl overflow-hidden" />
              </div>
              <div className="skeleton-effect !top-6 !right-6 flex gap-2 justify-end">
                <div className="w-16 h-3 rounded-3xl overflow-hidden" />
                <div className="w-12 h-3 rounded-2xl mr-4 overflow-hidden" />
              </div>

              <div className="skeleton-effect !top-20 !left-4 overflow-hidden">
                <LineChartSkeleton />
              </div>
            </div>
            <div className="relative col-span-2 rounded-xl h-80 p-6">
              <div className="skeleton-effect overflow-hidden rounded-2xl">
                <AreaChartSkeleton />
              </div>
            </div>
            <div className="bg-white relative col-span-1 rounded-xl h-80 p-6">
              <div className="skeleton-effect !top-6 !left-6 flex flex-col gap-2 justify-start">
                <div className="w-12 h-2 rounded-2xl overflow-hidden" />
                <div className="w-16 h-4 rounded-3xl overflow-hidden" />
              </div>

              <div className="skeleton-effect !top-20 flex justify-center overflow-hidden">
                <FullOutlinePieChartSkeleton />
              </div>

              <div className="skeleton-effect !top-64 mt-4 !left-6 flex gap-2">
                <div className="mt-0.5 w-2 h-2 rounded-full overflow-hidden" />
                <div className="w-12 h-3 rounded-3xl overflow-hidden" />

                <div className="ml-4 mt-0.5 w-2 h-2 rounded-full overflow-hidden" />
                <div className="w-12 h-3 rounded-3xl overflow-hidden" />
              </div>
            </div>
            <div className="bg-white relative col-span-1 rounded-xl h-80 p-6">
              <div className="skeleton-effect !top-6 flex flex-col gap-2 items-center">
                <div className="w-24 h-4 text-center rounded-3xl overflow-hidden" />
              </div>

              <div className="skeleton-effect !top-28 flex justify-center overflow-hidden">
                <GraphPieChartSkeleton />
              </div>

              <div className="skeleton-effect !top-56 mt-4 flex flex-col gap-2 items-center">
                <div className="w-20 h-2 rounded-3xl overflow-hidden" />
                <div className="mt-1 w-28 h-2 rounded-3xl overflow-hidden" />
                <div className="mt-1 w-28 h-2 rounded-3xl overflow-hidden" />
              </div>
            </div>
            <div className="bg-white relative col-span-2 rounded-xl h-80 p-6 overflow-hidden">
              <div className="skeleton-effect !top-6 !left-6 flex flex-col gap-2 justify-start">
                <div className="w-12 h-2 rounded-2xl overflow-hidden" />
                <div className="w-16 h-4 rounded-3xl overflow-hidden" />
              </div>
              <div className="skeleton-effect !top-6 !right-6 flex gap-2 justify-end">
                <div className="w-16 h-3 rounded-3xl  overflow-hidden" />
                <div className="w-12 h-3 rounded-2xl mr-4 overflow-hidden" />
              </div>
              <div className="skeleton-effect !left-16 !top-20 overflow-hidden">
                <RevenueLineChartSkeleton />
              </div>
            </div>
            <div className="bg-white relative col-span-2 rounded-xl h-80 p-6 overflow-hidden">
              <div className="skeleton-effect !top-6 !left-6 flex flex-col gap-2 justify-start">
                <div className="w-16 h-4 rounded-3xl overflow-hidden" />
              </div>
              <div className="skeleton-effect !left-6 !top-16 overflow-hidden">
                <TableSkeleton />
              </div>
            </div>
          </div>
          <div className="col-span-1 grid grid-cols-1 gap-6 auto-rows-min">
            <div className="bg-white relative rounded-xl h-96 p-6">
              <div className="skeleton-effect !top-6 !left-6 flex flex-col gap-2 justify-start">
                <div className="w-12 h-2 rounded-2xl overflow-hidden" />
                <div className="w-16 h-4 rounded-3xl overflow-hidden" />
              </div>
              <div className="skeleton-effect !left-12 ml-1 !top-20 overflow-hidden">
                <FullInlinePieChartSkeleton />
              </div>
            </div>
            <div className="bg-white relative rounded-xl h-80 p-6 overflow-hidden">
              <div className="skeleton-effect !top-6 !left-6 flex flex-col gap-2 justify-start">
                <div className="w-12 h-2 rounded-2xl overflow-hidden" />
                <div className="w-16 h-4 rounded-3xl overflow-hidden" />
              </div>

              <div className="skeleton-effect !top-20 mt-4 !left-6 flex gap-2">
                <div className="mt-0.5 w-2 h-2 rounded-full overflow-hidden" />
                <div className="w-12 h-3 rounded-3xl overflow-hidden" />

                <div className="ml-8 mt-0.5 w-2 h-2 rounded-full overflow-hidden" />
                <div className="w-12 h-3 rounded-3xl overflow-hidden" />

                <div className="ml-8 mt-0.5 w-2 h-2 rounded-full overflow-hidden" />
                <div className="w-12 h-3 rounded-3xl overflow-hidden" />
              </div>

              <div className="skeleton-effect !top-36 flex justify-center overflow-hidden">
                <GraphPieChartSkeleton />
              </div>
            </div>
            <div className="bg-white relative rounded-xl h-72 p-6">
              <div className="skeleton-effect !top-6 !left-6 flex flex-col gap-2 justify-start">
                <div className="w-12 h-2 rounded-2xl overflow-hidden" />
                <div className="w-16 h-4 rounded-3xl overflow-hidden" />
              </div>
              <div className="skeleton-effect !top-20 flex justify-center">
                <FullOutlinePieChartSkeleton />
              </div>
            </div>
            <div className="bg-white relative rounded-xl h-40 p-6">
              <div className="skeleton-effect !top-6 !left-6 flex flex-col gap-2 justify-start">
                <div className="w-12 h-2 rounded-2xl overflow-hidden" />
                <div className="w-16 h-4 rounded-3xl overflow-hidden" />
              </div>
              <div className="skeleton-effect !top-24 !left-6 flex gap-2 justify-start">
                <div className="mt-1 w-12 h-2 rounded-2xl overflow-hidden" />
                <div className="w-36 h-4 rounded-3xl overflow-hidden" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
