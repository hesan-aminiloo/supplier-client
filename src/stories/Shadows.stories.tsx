import { FC } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

const ShadowBox: FC<{ size: string }> = ({ size }) => (
  <div className={`w-32 h-32 rounded-full bg-white shadow-${size}`} />
);

const Shadows: FC = () => {
  return (
    <div className="p-10 rounded-lg m-5 border border-neutral-400 bg-gray-50 flex justify-around">
      {['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].map((size) => (
        <ShadowBox
          key={size}
          size={size}
        />
      ))}
    </div>
  );
};

export default {
  title: 'Shadows',
  component: Shadows,
} as ComponentMeta<typeof Shadows>;

const Template: ComponentStory<typeof Shadows> = () => <Shadows />;

export const AllShadows = Template.bind({});
AllShadows.args = {};
