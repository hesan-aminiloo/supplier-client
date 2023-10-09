import { ComponentMeta, ComponentStory } from '@storybook/react';

import { RadioGroup as RadioGroupComponent } from './RadioGroup';
import { Radio as RadioItemComponent } from '../radio';

const defaultExport: ComponentMeta<typeof RadioGroupComponent> = {
  title: 'Components/Selection Controls/RadioGroup',
  component: RadioGroupComponent,
  argTypes: {
    name: {
      description:
        'name is used to group radio buttons together.(you can set name in RadioButton and use it outside of RadioGroup). ',
    },
    vertical: {
      description: 'shows items vertical rather than horizontal',
    },
    onChange: {
      description: 'a callback function fires when selected radio button changes',
    },
    state: {
      description: 'determine the state of input, error state or nothing',
    },
    helperText: {
      description: 'a tiny text which will be shown below of the radio group',
    },
  },
};
export default defaultExport;

export const RadioItemGroup: ComponentStory<typeof RadioItemComponent> = () => {
  return (
    <div className="w-[320px] m-auto">
      <RadioGroupComponent name="radio-test">
        <RadioItemComponent
          label="Male"
          value="M"
        />

        <RadioItemComponent
          label="Female"
          value="F"
        />
      </RadioGroupComponent>
    </div>
  );
};
