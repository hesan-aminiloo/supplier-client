import { FC } from 'react';

interface BarnchStatusProps {
  isDeleted: boolean;
  active: boolean;
}
const BarnchStatus: FC<BarnchStatusProps> = ({ isDeleted, active }) => {
  if (isDeleted) {
    return (
      <div className="flex rounded-full h-[28px] leading-1 items-center  bg-destructive-100 text-xs px-2">
        <span className="text-destructive-600">Deleted</span>
      </div>
    );
  }

  if (active) {
    return (
      <div className="flex rounded-full h-[28px] leading-1 items-center  bg-analogous-teal-50 text-xs px-2">
        <span className="text-analogous-teal-600">Active</span>
      </div>
    );
  }

  return (
    <div className="flex rounded-full h-[28px] leading-1 items-center bg-neutral-200 text-xs px-2">
      <span className="text-neutral-600">Disabled</span>
    </div>
  );
};
export default BarnchStatus;
