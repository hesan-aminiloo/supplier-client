import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Radio as RadioItemComponent } from './Radio';

const defaultExport: ComponentMeta<typeof RadioItemComponent> = {
  title: 'Components/Selection Controls/Radio',
  component: RadioItemComponent,
  argTypes: {
    name: {
      description:
        'name is used to match all RadioItem together, when you use RadioGroup as parent ignore it on RadioButton and just pass it to the parent',
    },
    id: {
      description: 'this value is used to match the input with its label',
    },
    label: {
      description: 'label of radio item',
      defaultValue: '',
    },
    value: {
      description: 'value of input, this value is used to handle onChange event',
    },
    disabled: {
      description: 'disables the radio item',
    },
  },
};
export default defaultExport;

const Template: ComponentStory<typeof RadioItemComponent> = (args) => {
  return (
    <div>
      <RadioItemComponent {...args} />
    </div>
  );
};

export const Default: ComponentStory<typeof RadioItemComponent> = Template.bind({});
Default.args = {
  id: `radio-item-${String(Math.random())[5]}`,
  value: 'man',
  disabled: false,
};

export const Labled: ComponentStory<typeof RadioItemComponent> = Template.bind({});
Labled.args = {
  id: `radio-item-labled-${String(Math.random())[5]}`,
  value: 'labeled',
  disabled: false,
  label: 'Radio item',
};

export const Sizes: ComponentStory<typeof RadioItemComponent> = () => {
  return (
    <div className="flex flex-col">
      <RadioItemComponent
        name="sizes"
        size="sm"
        className="mb-2"
        value="real"
      />
      <RadioItemComponent
        name="sizes"
        size="md"
        className="mb-2"
        value="legal"
      />
      <RadioItemComponent
        name="sizes"
        size="lg"
        className="mb-2"
        value="ilegal"
      />
    </div>
  );
};
