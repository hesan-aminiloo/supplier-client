import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Card } from './Card.component';
import type { ICardProps } from './Card.types';

export default {
  title: 'Components/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args: ICardProps) => <Card {...args} />;

const TestChildren = () => (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut nihil nesciunt tempora deserunt dolorum recusandae
      molestias voluptas omnis assumenda, odit impedit, distinctio facilis neque eius natus voluptate quidem, facere
      sunt?
    </p>
  </>
);

export const WithCard = Template.bind({});
WithCard.args = {
  children: <TestChildren />,
};
