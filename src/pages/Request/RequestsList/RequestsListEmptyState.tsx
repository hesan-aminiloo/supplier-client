import { RequestsEmptyStateVector } from '@src/pages/Request/RequestsList/assets';

export const RequestsListEmptyState = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-y-5 py-40 mt-8 bg-white rounded-xl">
      <RequestsEmptyStateVector />
      <div className="flex flex-col gap-y-3 items-center">
        <h6 className="text-neutral-500 text-xl font-bold">
          There are no pending requests from customers at the moment.
        </h6>
        <p className="text-neutral-500 text-sm">Check back later or wait for new requests to arrive.</p>
      </div>
    </div>
  );
};
