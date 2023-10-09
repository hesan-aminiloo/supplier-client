import {
  SKELETON_CARD_COUNT,
  SKELETON_BUTTON_COUNT,
  SKELETON_TABLE_COUNT,
  SKELETON_NOTE_COUNT,
  SKELETON_TABLE_ROW_COUNT,
  SKELETON_PARTS_RETURNED_COUNT,
} from '@src/pages/Request/RequestDetails/RequestDetails.constants';

const CARD_SKELETONS = new Array(SKELETON_CARD_COUNT).fill('sk');
const BUTTON_SKELETONS = new Array(SKELETON_BUTTON_COUNT).fill('sk');
const TABLE_SKELETONS = new Array(SKELETON_TABLE_COUNT).fill('sk');
const TABLE_ROW_SKELETONS = new Array(SKELETON_TABLE_ROW_COUNT).fill('sk');
const NOTE_SKELETONS = new Array(SKELETON_NOTE_COUNT).fill('sk');
const PARTS_RETURNED_SKELETONS = new Array(SKELETON_PARTS_RETURNED_COUNT).fill('sk');

export const RequestDetailsSkeleton = () => {
  return (
    <div className="relative overflow-hidden mt-10 mb-10 flex flex-col gap-y-8">
      <div className="rounded-xl h-4 w-full overflow-hidden mr-auto mb-2">
        <div className="relative w-full h-full overflow-hidden" />
      </div>
      <div className="flex w-full h-24 text-sm bg-white items-center border relative rounded-xl border-stroke-4">
        <div className="skeleton-effect overflow-hidden grid grid-cols-5 gap-4 items-center px-6">
          {CARD_SKELETONS.map((_, key) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={key}
              className="h-12 "
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full h-80 bg-white items-center border relative rounded-xl border-stroke-4">
        <div className="skeleton-effect flex overflow-hidden px-2 mt-4">
          <div className="w-4 mt-3 h-4 top-1 rounded-sm absolute overflow-hidden left-6 lg:left-4" />
          <div className="w-28 mt-3 h-4 top-1 rounded-sm absolute  overflow-hidden left-9" />
        </div>
        <div className="mt-12 skeleton-effect overflow-hidden flex flex-col gap-y-2 items-center px-6">
          {TABLE_ROW_SKELETONS.map((_, parentKey) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={parentKey}
              className="w-full mt-4 grid grid-cols-7 gap-x-4 items-center bg-white"
            >
              {TABLE_SKELETONS.map((data, key) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={key}
                  className="h-24"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full h-52 bg-white items-center border relative rounded-xl border-stroke-4">
        <div className="skeleton-effect flex overflow-hidden px-2">
          <div className="w-4 mt-3 h-4 top-1 rounded-sm absolute overflow-hidden left-6 lg:left-4" />
          <div className="2xl:w-44 w-28 mt-3 h-4 top-1 rounded-sm absolute  overflow-hidden left-9" />
        </div>
        <div className="mt-4 skeleton-effect overflow-hidden grid grid-cols-4 gap-4 items-center px-6">
          {PARTS_RETURNED_SKELETONS.map((_, key) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={key}
              className="h-32"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full h-48 bg-white items-center border relative rounded-xl border-stroke-4">
        <div className="skeleton-effect flex overflow-hidden px-2 mt-4">
          <div className="w-4 mt-3 h-4 top-1 rounded-sm absolute overflow-hidden left-6 lg:left-4" />
          <div className="2xl:w-36 w-28 mt-3 h-4 top-1 rounded-sm absolute  overflow-hidden left-9" />
        </div>
        {NOTE_SKELETONS.map((_, key) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={key}
            className="mt-12 pt-12 skeleton-effect overflow-hidden flex flex-col px-6"
          >
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
          </div>
        ))}
      </div>

      <div className="flex w-full h-24 justify-between items-center">
        {BUTTON_SKELETONS.map((_, key) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={key}
            className="bg-white relative w-36 h-12 rounded-xl"
          >
            <div className="skeleton-effect flex items-center justify-center overflow-hidden px-2">
              <div className="w-20 h-4 rounded-sm overflow-hidden" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
