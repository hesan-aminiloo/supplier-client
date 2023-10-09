import React, { FC } from 'react';
import ImageGallery from 'react-image-gallery';
import { GalleryProps } from '@components/gallery';
import clsx from 'clsx';
import { DrawerHeader, ModalDrawer } from '@src/components';
import 'react-image-gallery/styles/css/image-gallery.css';
import { generateImageUrl } from '@src/utils';

export const Gallery: FC<GalleryProps> = ({ className, type, headerProps, images, galleryOptions, ...rest }) => {
  return (
    <ModalDrawer
      type={type}
      className={clsx('inline-block rounded-lg p-2.5', className)}
      isFullHeight
      {...rest}
    >
      <DrawerHeader {...headerProps} />

      <ImageGallery
        items={images.map((image) => ({ original: generateImageUrl(image), thumbnail: generateImageUrl(image) }))}
        {...galleryOptions}
      />
    </ModalDrawer>
  );
};
