import { FC } from 'react';

// Assets
import BlankPhoto from '@src/assets/images/blankPhoto.png';

// Utils
import clsx from 'clsx';

// Types
import { ImageProps } from './Image.types';

// Styles
import styles from './Image.module.scss';

export const Image: FC<ImageProps> = ({ onClick, src, alt, className, size = 'md' }) => {
  return (
    <div className={clsx(styles.image, styles[`image--${size}`], 'bg-neutral-200 relative rounded-lg', className)}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
      <img
        src={src ?? BlankPhoto}
        alt={alt || 'Image'}
        className="w-full h-full"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick?.(e);
        }}
      />
    </div>
  );
};

export default Image;
