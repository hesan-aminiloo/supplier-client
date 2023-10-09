import { DrawerHeaderProps, ModalDrawerProps } from '@src/components';

export interface VideoPlayerProps extends Omit<ModalDrawerProps, 'children'> {
  className?: string;
  headerProps: DrawerHeaderProps;
  videoUrl: string;
}
