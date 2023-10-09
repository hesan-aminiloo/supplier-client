import { FC } from 'react';

import { Card, Avatar } from '@src/components';

import { generateImageUrl } from '@src/utils';
import { GarageCardPropsI } from '../GarageCustomerDetails.types';

export const GarageCard: FC<GarageCardPropsI> = ({ data }) => {
  const { logo, garageName, branch } = data;
  return (
    <Card className="mt-8 flex justify-between items-center rounded-b-sm border border-stroke-4 shadow-xs">
      <div className="flex items-center">
        <Avatar
          src={generateImageUrl(logo)}
          userName={garageName}
          size="xxl"
        />
        <div className="ml-4 flex flex-col">
          <span className="text-xl text-primary-700 font-extrabold">{garageName}</span>
          <span className="text-neutral-500 text-base">{branch}</span>
        </div>
      </div>
      {/* <div>
        <Button
          variant="secondary"
          size="md"
          onClick={() => console.log('click')}
          className="mr-4"
          color="neutral"
        >
          <Icon
            name="edit"
            size="xs"
            color={Theme.colors.neutral500}
          />
        </Button>
        <Button
          variant="secondary"
          size="md"
          onClick={() => console.log('click')}
          color="destructive"
        >
          <Icon
            name="trash"
            size="xs"
            color={Theme.colors.destructive500}
          />
        </Button>
      </div> */}
    </Card>
  );
};

export default GarageCard;
