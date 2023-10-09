import { GarageCustomerNotFoundImage } from '@src/pages/GarageCustomers/assets/GarageCustomerNotFoundImage';

export const GarageCustomersNotFoundState = () => {
  return (
    <div className="mt-4 bg-white w-full h-[calc(100vh-215px)] flex flex-col justify-center content-center py-28 rounded-2xl shadow-sm">
      <div className="mb-10 flex justify-center">
        <GarageCustomerNotFoundImage />
      </div>
      <div className="text-center max-w-[355px] mx-auto">
        <p className="text-neutral-500 font-bold mb-2 text-xl">We couldn’t find any thing</p>
        <p className="text-neutral-500 text-sm">
          try to use some specific word according to your garage customer’s name
        </p>
      </div>
    </div>
  );
};
