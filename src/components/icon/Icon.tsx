import clsx from 'clsx';
import { FC, useMemo } from 'react';

import { IconProps, Sizes } from './Icon.types';
import styles from './Icon.module.scss';

export const Icon: FC<IconProps> = ({ name, color = '#000', size = 'md', className, id: tagId }) => {
  const hash = useMemo(() => `#${name}-icon`, [name]);

  return (
    <svg
      className={clsx(styles.icon, className)}
      width={Sizes.icons[size]}
      height={Sizes.icons[size]}
      id={tagId}
    >
      <use
        href={hash}
        xlinkHref={hash}
        width="100%"
        height="100%"
        fill={color}
        stroke={color}
      />
    </svg>
  );
};

export const getIconString = ({ name, color = '#000', size = 'md', className, id }: IconProps) => `<svg
                class="${clsx(styles.icon, className)}"
                width="${Sizes.icons[size]}"
                height="${Sizes.icons[size]}"
                ${id ? `id={id}` : ''}>
                  <use
                    href="#${name}-icon"
                    xlinkHref="#${name}-icon"
                    width='100%'
                    height='100%'
                    fill="${color}"
                    stroke="${color}"
                  />
              </svg>`;
