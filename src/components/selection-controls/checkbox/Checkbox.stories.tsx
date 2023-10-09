import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Checkbox as CheckBoxComponent } from './Checkbox';

const defaultExport: ComponentMeta<typeof CheckBoxComponent> = {
  title: 'Components/Selection Controls/Checkbox',
  component: CheckBoxComponent,
  argTypes: {
    name: {
      description: 'checkbox name',
    },
    label: {
      description: 'label of checkbox',
      defaultValue: '',
    },
    value: {
      description: 'value of checkbox, this value is used to handle onChange event',
    },
    disabled: {
      description: 'disables checkbox',
    },
  },
};
export default defaultExport;

const Template: ComponentStory<typeof CheckBoxComponent> = (args) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <CheckBoxComponent {...args} />
    </div>
  );
};

export const Default: ComponentStory<typeof CheckBoxComponent> = Template.bind({});
Default.args = {
  value: 'man',
  disabled: false,
};

export const Labled: ComponentStory<typeof CheckBoxComponent> = Template.bind({});
Labled.args = {
  value: 'man',
  disabled: false,
  label: 'test label',
};

export const Sizes: ComponentStory<typeof CheckBoxComponent> = () => {
  return (
    <div className="p-10 flex justify-center flex-col items-center">
      <CheckBoxComponent
        size="sm"
        className="mb-2"
        value="real"
      />
      <CheckBoxComponent
        size="md"
        className="mb-2"
        value="legal"
      />
      <CheckBoxComponent
        size="lg"
        className="mb-2"
        value="ilegal"
      />
    </div>
  );
};
