export const CreateMarketingNotifSkeleton = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="rounded-xl h-10 w-96 overflow-hidden mr-auto mb-14">
        <div className="relative w-full h-full overflow-hidden" />
      </div>
      <div
        // eslint-disable-next-line react/no-array-index-key
        className="relative flex flex-col bg-white border mb-32 h-96 w-full border-stroke-4 rounded-xl shadow-xs"
      >
        <div className="skeleton-effect overflow-hidden">
          <div className="w-32 h-7 rounded-sm absolute overflow-hidden top-7 left-6" />
          <div className="w-52  mt-3 h-5 rounded-sm absolute  overflow-hidden top-8 left-6" />
          <div className="w-52  mt-3 h-5 rounded-sm absolute  overflow-hidden top-52 left-6" />
          <div className="w-72  mt-3 h-5 rounded-sm absolute  overflow-hidden top-8 left-6" />
        </div>
      </div>
    </div>
  );
};
