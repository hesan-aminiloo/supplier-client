// Utils
import clsx from 'clsx';
// Types
import { Button, Icon } from '@src/components';
import { Theme } from '@src/style';
import { BranchItemPropsI } from './Branches.types';
import BarnchStatus from './BranchStatus';

const BranchItem: React.FC<BranchItemPropsI> = ({
  id,
  active,
  isDeleted,
  name,
  email,
  onDelete,
  className,
  onClick,
  onRestore,
  setIsLoading,
}) => (
  <button
    type="button"
    className={clsx(
      'bg-white border rounded-xl p-6 border-stroke-4 shadow-xs relative min-w-[260px] text-left',
      className
    )}
    onClick={() => onClick(id)}
  >
    <h4 className="text-xl font-bold text-neutral-900 text-ellipsis w-full overflow-hidden mb-1">{name}</h4>
    <p className="text-neutral-500 text-base font-normal text-ellipsis w-full overflow-hidden">{email}</p>
    <div className="flex justify-between items-center mt-4">
      <BarnchStatus
        isDeleted={isDeleted}
        active={Boolean(active)}
      />
      {isDeleted ? (
        <Button
          type="button"
          className="flex bg-analogous-teal-500 rounded-xl hover:bg-analogous-teal-700 focus:bg-analogous-teal-700"
          onClick={(e) => {
            setIsLoading();
            onRestore(id);
            e.preventDefault();
            e.stopPropagation();
          }}
          size="sm"
          leftIcon={
            <Icon
              name="refresh-2"
              color={Theme.colors.white}
              size="sm"
            />
          }
        >
          restore
        </Button>
      ) : (
        <Button
          type="button"
          variant="solid"
          color="destructive"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete?.(id);
          }}
        >
          <Icon
            name="trash"
            color={Theme.colors.white}
            size="sm"
          />
        </Button>
      )}
    </div>
  </button>
);

export default BranchItem;
