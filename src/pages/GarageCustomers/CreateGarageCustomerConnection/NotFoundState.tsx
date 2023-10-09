import { SearchGarageNotFoundStateSVG } from '@src/pages/GarageCustomers/assets/SearchGarageNotFoundState';

export const CreateGarageCustomerConnectionNotFoundState = () => {
  return (
    <div className="w-96 max-w-full flex flex-col justify-center items-center gap-y-12">
      <SearchGarageNotFoundStateSVG />
      <div className="w-full flex flex-col gap-y-2 justify-center ">
        <p className="text-neutral-500 font-bold text-center text-lg">
          We couldn’t find any customer with this ID number
        </p>
        <p className="text-neutral-500 text-sm text-center">Please try again</p>
      </div>
    </div>
  );
};

export default CreateGarageCustomerConnectionNotFoundState;
