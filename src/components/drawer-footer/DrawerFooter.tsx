import { Theme } from '@src/style';
import clsx from 'clsx';
import { FC } from 'react';
import { Button, Icon } from '@src/components';

import { DrawerFooterProps } from './DrawerFooter.types';

export const DrawerFooter: FC<DrawerFooterProps> = ({
  title,
  hasDelete = false,
  onDelete,
  className,
  onSubmit,
  loading,
  disabled,
}) => {
  return (
    <div className={clsx('p-6 bg-neutral-100 flex items-center w-full', className)}>
      <Button
        type="submit"
        size="md"
        className={hasDelete ? ' w-5/6' : 'w-full'}
        disabled={disabled || loading}
        loading={loading}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onSubmit();
        }}
      >
        {title}
      </Button>
      {hasDelete && (
        <Button
          leftIcon={
            <Icon
              color={Theme.colors.white}
              name="trash"
            />
          }
          color="destructive"
          className="shadow-xs ml-6 w-14 h-14 rounded-xl flex p-0 items-center justify-center bg-destructive-500 border"
          onClick={onDelete}
        />
      )}
    </div>
  );
};
