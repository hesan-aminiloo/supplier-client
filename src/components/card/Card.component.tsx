import { FC } from 'react';

// Utils
import clsx from 'clsx';
import RenderWhen from '@components/RenderWhen';

// Types
import { ICardProps } from './Card.types';

export const Card: FC<ICardProps> = ({ className, children, header, style }) => {
  return (
    <div
      className={clsx(
        'rounded-[13px] bg-white border-stroke-4 shadow-xs p-6',
        className,
        header ? 'flex-col pb-8' : ''
      )}
      style={style}
    >
      {header ? (
        <div className={clsx('w-full mb-5 flex gap-4 py-5 border-b-2 border-neutral-100', header.className)}>
          {header.icon}
          <div className="flex flex-col gap-1">
            <RenderWhen is={!!header.secondaryTitle}>
              <p className="text-neutral-500 text-sm">{header.secondaryTitle}</p>
            </RenderWhen>
            <p className="text-neutral-800 text-xl font-bold">{header.title}</p>
          </div>
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default Card;
