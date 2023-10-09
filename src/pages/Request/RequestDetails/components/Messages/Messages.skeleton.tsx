import clsx from 'clsx';

const MESSAGE_SKELETONS = new Array(12).fill('sk');

export const MessagesSkeleton = () => {
  return (
    <div className="relative h-full overflow-hidden flex flex-col gap-y-8 pt-4">
      <div className="flex w-full h-full flex-col text-sm items-center">
        <div className="skeleton-effect overflow-hidden w-full h-full flex flex-col gap-4 items-center px-6">
          {MESSAGE_SKELETONS.map((_, key) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={key}
              className={clsx('h-12', {
                'mr-auto w-96 rounded-tr-2xl': key % 2 === 0,
                'ml-auto w-72 rounded-tl-2xl': key % 2 !== 0,
              })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const MessageItemSkeleton = () => {
  return (
    <div className="relative  h-28 overflow-hidden flex flex-col gap-y-8 pt-4">
      <div className="flex w-full  h-28 flex-col text-sm items-center">
        <div className="skeleton-effect overflow-hidden w-full flex flex-col gap-4 items-center px-6 h-28">
          <div className="h-12 mr-auto w-96 rounded-tr-2xl" />
          <div className="h-12 ml-auto w-72 rounded-tl-2xl" />
        </div>
      </div>
    </div>
  );
};

export default MessagesSkeleton;
