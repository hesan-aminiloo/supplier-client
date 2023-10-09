import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DrawerPlacement } from '@src/components';
import { Gallery } from './Gallery';
import type { GalleryProps } from './Gallery.types';

export default {
  title: 'Components/Gallery',
  component: Gallery,
} as ComponentMeta<typeof Gallery>;

const Template: ComponentStory<typeof Gallery> = (args: GalleryProps) => <Gallery {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  images: [
    'http://codeskulptor-assets.commondatastorage.googleapis.com/assets_clock_background.png',
    'http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/nebula_brown.png',
    'http://codeskulptor-assets.commondatastorage.googleapis.com/assets_clock_background.png',
    'http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/nebula_brown.png',
    'http://codeskulptor-assets.commondatastorage.googleapis.com/assets_clock_background.png',
  ],
  isOpen: true,
  isFullHeight: true,
  placement: DrawerPlacement.Bottom,
  type: 'drawer',
};
