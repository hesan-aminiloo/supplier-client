import { FC } from 'react';

// Utils
import clsx from 'clsx';
import { useBoolean } from '@src/utils';

// Types
import { IAvatarProps } from './Avatar.types';

// Constants
import { AVATAR_TEXT_SIZE, AVATAR_INDICATOR_COLOR } from './Avatar.constants';

import styles from './Avatar.module.scss';

const hideIndicatorFor = /hg|xhg/;

export const Avatar: FC<IAvatarProps> = ({
  src,
  alt,
  size,
  className,
  userName,
  indicator = 'none',
  onClick,
  slot = null,
}) => {
  const [hasError, setHasError] = useBoolean(false);
  return (
    <button
      onClick={onClick}
      type="button"
      className="border-0 bg-transparent outline-none relative"
    >
      <span
        className={clsx(
          styles.avatar,
          styles[`avatar--${size}`],
          'rounded-full overflow-hidden border-white shadow-lg flex items-center justify-center',
          className,
          {
            'bg-primary-50': !src || hasError,
            'border-4': size.toString().match(hideIndicatorFor),
          }
        )}
      >
        {src && !hasError ? (
          <img
            src={src}
            onError={setHasError.setTrue}
            alt={alt || userName || 'Profile Image'}
            className="w-full h-full object-cover"
          />
        ) : null}

        {userName && (!src || hasError) ? (
          <span className={clsx(AVATAR_TEXT_SIZE[size], 'text-primary-500 font-medium')}>
            {userName
              .split(' ')
              .map((l) => l.slice(0, 1))
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </span>
        ) : null}

        {/* TODO: HANDLE DEFAULT USER ICON */}
        {/* {!src && !userName ? <DefaultUser className="fill-primary-500 translate-y-[5px]" /> : null} */}

        {!!slot && slot}
      </span>
      {indicator !== 'none' && !size.toString().match(hideIndicatorFor) && (
        <span
          className={clsx(
            styles[`avatar--${size}__indicator`],
            'rounded-full inline-block absolute bottom-0 right-0 border-2 border-white',
            AVATAR_INDICATOR_COLOR[indicator]
          )}
        />
      )}
    </button>
  );
};

export default Avatar;
