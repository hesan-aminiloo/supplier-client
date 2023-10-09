import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Badge } from './Badge';
import type { BadgeProps } from './Badge.types';

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    color: {
      control: 'select',
      defaultValue: 'primary',
      options: ['primary', 'warning', 'destructive', 'success'],
    },
    variant: {
      control: 'select',
      defaultValue: 'tertiary',
      options: ['tertiary'],
    },
  },
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args: BadgeProps) => (
  <div className="bg-white p-5">
    <Badge {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  variant: 'tertiary',
  color: 'primary',
  children: 'Badge Tertiary',
};
