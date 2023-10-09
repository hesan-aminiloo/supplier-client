import { SearchGarageDefaultStateSVG } from '@src/pages/GarageCustomers/assets/SearchGarageDefaultState';

export const CreateGarageCustomerConnectionDefaultState = () => {
  return (
    <div className="w-96 max-w-full flex flex-col justify-center items-center gap-y-12">
      <SearchGarageDefaultStateSVG />
      <div className="w-full flex flex-col gap-y-2 justify-center ">
        <p className="text-neutral-500 font-bold text-center text-lg">To find a garage, enter their unique ID</p>
        <p className="text-neutral-500 text-sm text-center">
          The garage administrator can find their unique ID on the mobile application via the account details screen in
          settings
        </p>
      </div>
    </div>
  );
};

export default CreateGarageCustomerConnectionDefaultState;
