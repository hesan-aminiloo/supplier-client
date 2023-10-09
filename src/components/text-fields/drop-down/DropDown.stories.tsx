import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { DropDown as ResponsiveDropdown } from './DropDown';

const defaultExport: ComponentMeta<typeof ResponsiveDropdown> = {
  title: 'Components/Dropdown/ResponsiveDropdown',
  component: ResponsiveDropdown,
  argTypes: {
    id: { description: 'a unique identifier always must be provided' },
    status: {
      description: 'determines the state of component and changes its style accordingly',
      control: 'select',
      options: ['none', 'error'],
    },
    label: {
      description:
        'label of dropdown, scales down and moves up when dropdown is focused or has a value, label is necessary for accessibility',
    },
    helperText: { description: 'a tiny text which will be shown below of the component' },
    fullWidth: { description: 'makes component width full, fits into its container' },
    open: {
      description:
        'opens the dropdown menu, if open value is provided the default interactive behavior of component would be disabled and should be treated as a controlled component (NOTE: if you want the component open by default still not to be controlled, use `autoFocus` attribute ) ',
    },
    deviceType: {
      control: 'select',
      options: ['mobile', 'desktop'],
      description: 'opens a drawer menu in `mobile` mode otherwise shows a dropdown below of the component',
    },
    delay: {
      description:
        'delay time of opening and closing animation (helpful when some interaction with open menu is involved) ',
    },
  },
};
export default defaultExport;

const Template: ComponentStory<typeof ResponsiveDropdown> = ({ ...args }) => {
  const [selectedValue, setSelectedValue] = useState('');
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '6rem' }}>
      <ResponsiveDropdown
        {...args}
        value={selectedValue}
        readOnly
      >
        <div>
          <button
            onClick={() => setSelectedValue('Item 1')}
            className="text-left w-full block p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
          >
            Item 1
          </button>
          <button
            onClick={() => setSelectedValue('Item 2')}
            className="text-left w-full block p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
          >
            Item 2
          </button>
        </div>
      </ResponsiveDropdown>
    </div>
  );
};

export const Default: ComponentStory<typeof ResponsiveDropdown> = Template.bind({});
Default.args = {
  id: 'Default',
  helperText: '',
  label: 'Drop down input',
};
