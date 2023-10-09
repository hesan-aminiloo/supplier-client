import { Button, DrawerFooter, FormInput, FormPassword, Icon } from '@src/components';
import { Theme } from '@src/style';
import { generateRandomPassword } from '@src/utils';
import { UseFormReturn } from 'react-hook-form';
import { IGarageCustomerForm } from './GarageCustomers.types';

export const GarageCustomerUserForm = ({
  onSubmit,
  methods,
  isLoading,
}: {
  isLoading: boolean;
  methods: UseFormReturn<IGarageCustomerForm, any>;
  onSubmit: (fields: IGarageCustomerForm) => void;
}) => {
  const handleAutoPassword = (fieldName: string) => {
    const randomPass = generateRandomPassword({ length: 12 });
    // NOTE: This ts-ignore is necessary
    // @ts-ignore
    methods.clearErrors(fieldName);
    // NOTE: This ts-ignore is necessary
    // @ts-ignore
    methods.setValue(fieldName, randomPass);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <FormInput
            label="First name"
            type="text"
            placeholder="First name"
            leftIcon={
              <Icon
                name="user"
                size="sm"
                color={Theme.colors.neutral500}
              />
            }
            disabled={isLoading}
            name="users[0].firstName"
            control={methods.control}
          />
        </div>
        <div>
          <FormInput
            label="Last name"
            type="text"
            placeholder="Last name"
            disabled={isLoading}
            leftIcon={
              <Icon
                name="user"
                size="sm"
                color={Theme.colors.neutral500}
              />
            }
            name="users[0].lastName"
            control={methods.control}
          />
        </div>
        <div>
          <FormInput
            label="Username"
            type="text"
            placeholder="Username"
            disabled={isLoading}
            leftIcon={
              <Icon
                name="user"
                size="sm"
                color={Theme.colors.neutral500}
              />
            }
            name="users[0].username"
            control={methods.control}
          />
        </div>
        <div>
          <FormInput
            label="Phone"
            type="phone"
            disabled={isLoading}
            leftIcon={
              <Icon
                name="mobile"
                size="sm"
                color={Theme.colors.neutral500}
              />
            }
            name="users[0].phone"
            placeholder="Phone number"
            control={methods.control}
          />
        </div>
        <div>
          <FormInput
            label="Email"
            type="email"
            disabled={isLoading}
            leftIcon={
              <Icon
                name="sms"
                size="sm"
                color={Theme.colors.neutral500}
              />
            }
            name="users[0].email"
            placeholder="Email address"
            control={methods.control}
          />
        </div>
      </div>
      <div className="my-6 bg-stroke-12 h-[1px] w-full" />
      <div className="grid grid-cols-2 gap-6 h-24 items-center">
        <FormPassword
          label="Password"
          disabled={isLoading}
          leftIcon={
            <Icon
              name="lock-1"
              size="sm"
              color={Theme.colors.neutral500}
            />
          }
          className="h-full"
          name="users[0].password"
          placeholder="Password"
          control={methods.control}
        />
        <div className="flex items-start">
          <Button
            variant="solid"
            disabled={isLoading}
            color="primary"
            fullWidth
            type="button"
            className="h-11 self-end"
            onClick={(e) => {
              e.preventDefault();
              handleAutoPassword('users[0].password');
            }}
          >
            Auto generate
          </Button>
        </div>
      </div>
      <DrawerFooter
        title={isLoading ? 'Loading ...' : 'Submit'}
        className="absolute left-0 bottom-0 right-0"
        disabled={isLoading || !methods.formState.isValid}
        onSubmit={methods.handleSubmit(onSubmit)}
      />
    </div>
  );
};
