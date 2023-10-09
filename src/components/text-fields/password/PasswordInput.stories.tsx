import { Icon } from '@src/components/icon';
import { Theme } from '@src/style';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PasswordInput as InputComponent } from './PasswordInput';

const defaultExport: ComponentMeta<typeof InputComponent> = {
  title: 'Components/Text Fields/Password',
  component: InputComponent,
  argTypes: {
    id: { description: 'a unique identifier' },
    label: {
      description:
        'label of input, scales down and moves up when input is focused or has a value, label is necessary for accessibility',
    },
    value: { description: 'value of input' },
    onChange: { description: 'a callback function fires when the input value changes' },
    onSubmit: { description: 'a callback function fires when enter key is pressed' },
    helperText: { description: 'a tiny text which will be shown below of the input' },
    fullWidth: { description: 'makes inputs width full, fits into container' },
    leftIcon: {
      description: 'shows an icon inside of the input',
    },
    placeholder: {
      description: 'placeholder text works as a guide, will be shown when input is focused and has not value',
    },
  },
};
export default defaultExport;

const Template: ComponentStory<typeof InputComponent> = (args) => (
  <div>
    <InputComponent {...args} />
  </div>
);

export const Default: ComponentStory<typeof InputComponent> = Template.bind({});

Default.args = {
  placeholder: 'Some strong password',
  label: 'Password',
};

export const WithLeftIcon: ComponentStory<typeof InputComponent> = Template.bind({});

WithLeftIcon.args = {
  placeholder: 'John Doe',
  label: 'Password input',
  leftIcon: (
    <Icon
      name="lock-1"
      color={Theme.colors.neutral500}
      size="sm"
    />
  ),
};

export const WithError: ComponentStory<typeof InputComponent> = Template.bind({});

WithError.args = {
  placeholder: 'John Doe',
  label: 'Password input',
  error: 'Wrong password',
};
