import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { REQUEST_LIST_LABELS, SKELETON_ITEMS_COUNT, SKELETON_INPUTS_COUNT } from './Requests.constants';

const SKELETONS = new Array(SKELETON_ITEMS_COUNT).fill('sk');
const INPUT_SKELETONS = new Array(SKELETON_INPUTS_COUNT).fill('sk');

export const RequestsTableSkeleton = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex w-full ">
        {REQUEST_LIST_LABELS.map((label) => (
          <p
            key={label.name}
            className={clsx(
              'flex-1 text-neutral-500 ml-6 first:ml-16 last:flex-none last:w-16 last:mr-14',
              label.className
            )}
          >
            {t(label.name)}
          </p>
        ))}
      </div>
      <div className="flex flex-col gap-y-3 relative overflow-hidden">
        {SKELETONS.map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="flex w-full h-14 text-sm bg-white items-center border relative rounded-xl border-stroke-4"
          >
            <div className="skeleton-effect overflow-hidden flex gap-4">
              <div className="w-1/12 h-5  absolute top-4 left-10 " />
              <div className="w-1/12 h-5  absolute top-4 left-20" />
              <div className="2xl:w-2/12 w-28 h-5  absolute top-4 left-28" />
              <div className="2xl:w-56 w-32 h-5  absolute top-4 left-32" />
              <div className="w-1/12 h-5  absolute top-4 left-36" />
              <div className="w-1/12 h-5  absolute top-4 left-40" />
              <div className="2xl:w-52 w-28 h-5  absolute top-4 left-48" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export const RequestsSkeleton = () => {
  return (
    <div className="relative overflow-hidden mt-10">
      <div className="rounded-xl h-10 w-96 overflow-hidden mr-auto mb-14">
        <div className="relative w-full h-full overflow-hidden" />
      </div>

      <div className="flex relative flex-col w-full gap-y-3 mt-12">
        <div className="relative grid grid-cols-5 mb-10 gap-8 lg:gap-4 overflow-hidden">
          {INPUT_SKELETONS.map((_, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="relative flex flex-col bg-white border h-12 w-62 border-stroke-4 rounded-xl shadow-xs"
            >
              <div className="skeleton-effect flex overflow-hidden">
                <div className="w-4 mt-3 h-4 top-1 rounded-sm absolute overflow-hidden left-6 lg:left-4" />
                <div className="2xl:w-44 w-28 mt-3 h-4 top-1 rounded-sm absolute  overflow-hidden left-9" />
              </div>
            </div>
          ))}
        </div>
        <RequestsTableSkeleton />
      </div>
    </div>
  );
};
