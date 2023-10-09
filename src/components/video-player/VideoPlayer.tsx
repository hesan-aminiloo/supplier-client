import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import clsx from 'clsx';
import { DrawerHeader, ModalDrawer } from '@src/components';
import { VideoPlayerProps } from '@components/video-player/VideoPlayer.types';

export const VideoPlayerForwardRef: ForwardRefRenderFunction<HTMLVideoElement, VideoPlayerProps> = (
  { className, type, headerProps, videoUrl, ...rest },
  ref
) => {
  return (
    <ModalDrawer
      type={type}
      className={clsx('inline-block rounded-lg p-2.5', className)}
      isFullHeight
      {...rest}
    >
      <DrawerHeader {...headerProps} />

      <div className="w-full h-full rounded-lg overflow-hidden">
        <video
          controls
          className="w-full h-auto max-h-full"
          ref={ref}
        >
          <source
            src={videoUrl}
            type="video/mp4"
          />
          <source
            src={videoUrl}
            type="video/mov"
          />
          <source
            src={videoUrl}
            type="video/avi"
          />
          <track
            src=""
            kind="captions"
            srcLang="en"
            label="english_captions"
          />
        </video>
      </div>
    </ModalDrawer>
  );
};

export const VideoPlayer = forwardRef(VideoPlayerForwardRef);
