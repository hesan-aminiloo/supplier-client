import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// components
import { Card, DrawerPlacement, Icon, Table } from '@src/components';

// styles
import { Theme } from '@src/style';

// components
import { Gallery } from '@components/gallery';

// constants
import {
  CONFIRMED_REQUIRED_PARTS_COLUMNS,
  REQUIRED_PARTS_COLUMNS,
} from '@src/pages/Request/RequestDetails/RequestDetails.constants';

// types
import { RequestDetailsPartsProps } from '@src/pages/Request/RequestDetails/RequestDetails.types';

// tools
import { generatePartRows } from '@src/pages/Request/RequestDetails/RequestDetails.tools';

const cardHeader = {
  icon: (
    <Icon
      name="box"
      color={Theme.colors.neutral500}
    />
  ),
  title: 'request_details.part_details.title',
  className: 'border-bottom-stroke-4',
};

export const RequestDetailsParts: React.FC<RequestDetailsPartsProps> = ({ parts, status }) => {
  const { t } = useTranslation();
  const [gallery, setGallery] = useState<string[]>([]);

  const handleCloseGallery = () => {
    setGallery([]);
  };

  return (
    <>
      <Card
        header={{
          ...cardHeader,
          title: t(cardHeader.title),
        }}
        className="flex h-auto w-full text-sm bg-white items-start justify-between px-6 py-3 border rounded-xl border-stroke-4"
      >
        <Table
          columns={status === 'confirmed' ? CONFIRMED_REQUIRED_PARTS_COLUMNS : REQUIRED_PARTS_COLUMNS}
          rows={generatePartRows(parts, setGallery)}
          className="border-collapse table-auto w-full text-sm"
        />
      </Card>

      <Gallery
        galleryOptions={{
          autoPlay: false,
          showFullscreenButton: false,
          showPlayButton: false,
        }}
        isOpen={gallery.length > 0}
        images={gallery}
        type="drawer"
        placement={DrawerPlacement.Bottom}
        isFullHeight
        headerProps={{
          title: t('request_details.part_details.part_required'),
          onClose: handleCloseGallery,
        }}
        onClosed={handleCloseGallery}
      />
    </>
  );
};

export default RequestDetailsParts;
