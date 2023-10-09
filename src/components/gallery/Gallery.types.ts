import { DrawerHeaderProps, ModalDrawerProps } from '@src/components';
import { ReactImageGalleryProps } from 'react-image-gallery';

export interface GalleryProps extends Omit<ModalDrawerProps, 'children'> {
  className?: string;
  headerProps: DrawerHeaderProps;
  images: string[];
  galleryOptions?: Omit<ReactImageGalleryProps, 'items'>;
}
