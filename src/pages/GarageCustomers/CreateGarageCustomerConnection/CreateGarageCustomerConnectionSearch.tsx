import { useTranslation } from 'react-i18next';
import { FormProvider } from 'react-hook-form';
import { Button, FormInput, Icon } from '@src/components';
import { ICreateGarageConnectionSearchProps } from './CreateGarageCustomerConnection.types';

export const CreateGarageCustomerConnectionSearch = ({
  onSubmit,
  methods,
  isLoading,
}: ICreateGarageConnectionSearchProps) => {
  const { t } = useTranslation();
  return (
    <FormProvider {...methods}>
      <form
        className="w-full h-24 flex justify-between items-center gap-x-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="w-5/6 h-24 ">
          <FormInput
            className="h-full"
            control={methods.control}
            name="value"
            placeholder="Enter ID number"
            leftIcon={
              <Icon
                size="sm"
                name="search-normal-1"
              />
            }
          />
        </div>
        <div className="h-24 w-1/6 flex justify-center items-center">
          <Button
            className="w-full"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          >
            {t('garage_customer_details.connect_garage_customer.search')}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateGarageCustomerConnectionSearch;
