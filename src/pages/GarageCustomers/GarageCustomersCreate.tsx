/* eslint-disable no-unused-vars */
import { DrawerHeader, DrawerPlacement, ModalDrawer, Stepper, IStepperProps } from '@src/components';
import { FormProvider } from 'react-hook-form';
import { useCreateGarageForm } from '@src/pages/GarageCustomers/GarageCustomers.tools';
import { GarageCustomerContactForm } from './GarageCustomerContactForm';
import { ICreateGarageDrawer, StepsEnum, IGarageCustomerForm } from './GarageCustomers.types';
import { GarageCustomerUserForm } from './GarageCustomerUserForm';
import { createGarageCustomerDefaultValues } from './GarageCustomers.constants';

const steps: IStepperProps['steps'] = [
  {
    id: StepsEnum.CUSTOMER,
    title: 'Customer info',
    isActive: true,
  },
  {
    id: StepsEnum.USER,
    title: 'User',
  },
];

export const GarageCustomersCreateDrawer = ({ isOpen, onClose }: ICreateGarageDrawer) => {
  const { methods, onSubmit, isLoading } = useCreateGarageForm({
    defaultValues: createGarageCustomerDefaultValues,
    onClose,
  });
  const currentStep = methods.watch('step');

  const handleContactSubmit = () => {
    methods.setValue('step', StepsEnum.USER);
  };

  const handleUserSubmit = (fields: IGarageCustomerForm) => {
    const data = new FormData();
    data.append('name', fields.name);
    data.append('logo', fields.logo ?? '');
    data.append('branchId', fields.branchId?.toString?.());
    data.append('users[0][firstName]', fields.users[0].firstName);
    data.append('users[0][lastName]', fields.users[0].lastName);
    data.append('users[0][username]', fields.users[0].username);
    data.append('users[0][email]', fields.users[0].email);
    data.append('users[0][phone]', fields.users[0].phone);
    data.append('users[0][password]', fields.users[0].password);
    data.append('users[0][password_confirmation]', fields.users[0].password);
    data.append('users[0][role]', 'administrator');
    data.append('contact[city]', fields.contact.city);
    data.append('contact[email]', fields.contact.email);
    data.append('contact[countryId]', fields.contact.countryId as string);
    data.append('contact[phone]', fields.contact.phone);
    data.append('contact[address]', fields.contact.address);
    data.append('contact[postCode]', fields.contact.postCode);
    onSubmit(data);
  };

  return (
    <ModalDrawer
      type="drawer"
      placement={DrawerPlacement.Right}
      isOpen={isOpen}
      onClosed={() => {
        methods.setValue('step', StepsEnum.CUSTOMER);
        methods.reset(createGarageCustomerDefaultValues);
        onClose(false);
      }}
    >
      <div className="h-full bg-neutral-100 overflow-auto">
        <DrawerHeader
          title="Add garage customer"
          onClose={() => onClose(false)}
        />
        <div className="p-6 ">
          <Stepper
            steps={steps}
            onChange={(step) => {
              methods.setValue('step', step as StepsEnum);
            }}
            activeStep={currentStep}
            disabledIndex={!methods.formState.isValid ? 1 : undefined}
          />
          <FormProvider {...methods}>
            <form>
              <div className="py-6">
                {currentStep === StepsEnum.CUSTOMER && (
                  <GarageCustomerContactForm
                    methods={methods}
                    onSubmit={handleContactSubmit}
                  />
                )}

                {currentStep === StepsEnum.USER && (
                  <GarageCustomerUserForm
                    methods={methods}
                    isLoading={isLoading}
                    onSubmit={handleUserSubmit}
                  />
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </ModalDrawer>
  );
};
