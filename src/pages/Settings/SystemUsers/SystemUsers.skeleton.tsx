import React from 'react';
import { useTranslation } from 'react-i18next';
import { SKELETON_ITEMS_COUNT, USER_LIST_LABELS } from './SystemUsers.constants';

const SKELETONS = new Array(SKELETON_ITEMS_COUNT).fill('sk');

export const SystemUsersSkeleton = () => {
  const { t } = useTranslation();
  return (
    <div className="relative overflow-hidden mt-10">
      <div className="flex relative flex-col w-full gap-y-3 ">
        <div className="flex w-full ">
          {USER_LIST_LABELS.map((label) => (
            <p
              key={label}
              className="flex-1 text-neutral-500 ml-6 first:ml-16 last:flex-none last:w-20 last:mr-14"
            >
              {t(label)}
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
                {/* <div className="ml-4 w-5 h-5 absolute top-4 " /> */}
                <div className="w-1/6 h-5  absolute top-4 left-3 " />
                <div className="w-48 h-5  absolute top-4 left-12" />
                <div className="w-1/6 h-5  absolute top-4 left-28" />
                <div className="w-1/6 h-5  absolute top-4 left-36" />
                <div className="w-40 h-5  absolute top-4 left-48" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
