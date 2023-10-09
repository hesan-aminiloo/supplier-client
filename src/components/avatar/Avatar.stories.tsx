import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Avatar } from './Avatar';
import type { IAvatarProps } from './Avatar.types';

export default {
  title: 'Components/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args: IAvatarProps) => <Avatar {...args} />;

export const WithAvatar = Template.bind({});
WithAvatar.args = {
  size: 'lg',
  src: 'https://elireview.com/wp-content/uploads/2016/12/reed-profile-square.jpg',
};

export const WithUsername = Template.bind({});
WithUsername.args = {
  size: 'lg',
  userName: 'Hesan Aminiloo',
};

export const WithIndicator = Template.bind({});
WithIndicator.args = {
  size: 'lg',
  userName: 'Hesan Aminiloo',
  indicator: 'online',
};

export const WithDefaultImage = Template.bind({});
WithDefaultImage.args = {
  size: 'lg',
};
