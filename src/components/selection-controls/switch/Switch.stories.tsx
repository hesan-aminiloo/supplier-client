import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Switch as SwitchComponent } from './Switch';

const defaultExport: ComponentMeta<typeof SwitchComponent> = {
  title: 'Components/Selection Controls/Switch',
  component: SwitchComponent,
  argTypes: {
    id: {
      description: 'ID is used to match label with its switch component, set this value for semantical reasons',
    },
    onChange: {
      description: 'fires when switch is clicked with a `boolean` value',
    },
    size: {
      description: 'size of switch',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
      table: { defaultValue: 'md' },
    },
    disabled: {
      description: 'disables the component',
      defaultValue: false,
    },
  },
};
export default defaultExport;

const Template: ComponentStory<typeof SwitchComponent> = (args) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <SwitchComponent {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  size: 'lg',
  id: 'test',
  disabled: false,
};

export const Sizes = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <SwitchComponent
        id="small"
        size="sm"
        defaultChecked
      />
      <br />
      <br />
      <SwitchComponent
        id="medium"
        size="md"
      />
      <br />
      <br />
      <SwitchComponent
        id="large"
        size="lg"
      />
    </div>
  );
};

export const Disabled = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <SwitchComponent
        id="disabled-checked"
        disabled
        size="md"
        defaultChecked
      />
      <br />
      <br />
      <SwitchComponent
        id="disabled"
        disabled
        size="md"
      />
    </div>
  );
};
