import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

// components
import { Card, DrawerPlacement, Image, VideoPlayer } from '@src/components';

import PlayButton from '@src/assets/images/playButton.svg';

// types
import { convertToMMSS, RequestDetailsVideoProps } from '@src/pages/Request/RequestDetails';

export const RequestDetailsVideo: React.FC<RequestDetailsVideoProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <Card className="flex h-auto w-full text-sm bg-white items-start justify-between px-6 py-3 border rounded-xl border-stroke-4">
        <div className="flex gap-4 items-center">
          <Image
            size="xl"
            src={PlayButton}
            className="!rounded-full cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
          <div className="flex flex-col gap-1">
            <p className="text-gray-900 text-base font-semibold leading-normal">{t('request_details.video')}</p>
            {videoRef.current?.duration ? (
              <p className="text-gray-500 text-sm font-medium leading-normal">
                {convertToMMSS(videoRef.current?.duration)}
              </p>
            ) : null}
          </div>
        </div>
      </Card>
      <VideoPlayer
        type="drawer"
        placement={DrawerPlacement.Bottom}
        isOpen={isOpen}
        headerProps={{
          title: t('request_details.video'),
          onClose: () => setIsOpen(false),
        }}
        videoUrl={videoUrl}
        onClosed={() => setIsOpen(false)}
      />
      <video
        controls
        className="w-full hidden h-auto max-h-full"
        ref={videoRef}
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
    </>
  );
};

export default RequestDetailsVideo;
