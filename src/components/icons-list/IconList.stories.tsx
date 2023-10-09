import { ComponentMeta, ComponentStory } from '@storybook/react';
import clsx from 'clsx';
import { Icon } from '@src/components/icon';
import { IconNames } from '@src/components/icon/Icon.types';
import { useCopyToClipboard } from 'react-use';

import styles from './Icon.stories.module.scss';

const IconNamesList: Array<IconNames> = [
  'add',
  'arrow-down-1',
  'arrow-left',
  'arrow-up-2',
  'arrow-right',
  'barcode',
  'box',
  'building',
  'calendar-1',
  'call-calling',
  'car',
  'check',
  'chart-3',
  'clipboard-close',
  'clipboard-text',
  'close',
  'copy-success',
  'danger',
  'document-copy',
  'document-filter',
  'document-forward',
  'document-previous',
  'document-text',
  'document-upload',
  'dollar-circle',
  'edit-2',
  'edit',
  'element-4',
  'eye-slash',
  'eye',
  'flag',
  'frame-1',
  'gallery',
  'gps',
  'history',
  'home-hashtag',
  'location',
  'lock-1',
  'logout-1',
  'menu-1',
  'message-question',
  'messages',
  'mobile',
  'more',
  'notification-1',
  'notification-bing',
  'pause-circle',
  'people',
  'play-circle',
  'profile-2user',
  'receipt-item',
  'search-normal-1',
  'setting',
  'shopping-cart',
  'sign-post',
  'sms',
  'sort',
  'status',
  'trash',
  'truck-fast',
  'tick-circle',
  'user-octagon',
  'user',
  'warning-2',
  'refresh-2',
];

const defaultExport: ComponentMeta<typeof Icon> = {
  title: 'Components/IconList',
  component: Icon,
  parameters: {
    viewport: {
      defaultViewport: 'Ipad Pro',
    },
  },
  argTypes: {
    name: {
      description: 'The name of the icon',
      type: 'string',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'The size of the icon',
    },
  },
};
export default defaultExport;

const Template: ComponentStory<typeof Icon> = () => {
  const [, copyToClipboard] = useCopyToClipboard();
  return (
    <>
      <div
        className="text-center mb-8"
        style={{ fontSize: 24 }}
      >
        Click to copy icon name
      </div>
      <div className={styles['icon-list-container']}>
        {IconNamesList.map((icon: IconNames) => (
          <button
            onClick={() => copyToClipboard(icon)}
            className={clsx(styles['icon-list-container__icon'], 'flex')}
            key={icon}
          >
            <div className="flex justify-between items-center mb-2">
              <Icon
                name={icon}
                size="sm"
                className="mr-3"
              />
              <Icon
                name={icon}
                size="md"
                className="mr-3"
              />
              <Icon
                name={icon}
                size="lg"
              />
            </div>
            <div className="text-sm text-center">{icon}</div>
          </button>
        ))}
      </div>
    </>
  );
};

export const IconsList: ComponentStory<typeof Icon> = Template.bind({});
