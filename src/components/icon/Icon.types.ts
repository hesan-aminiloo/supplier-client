type iconsType = {
  xs: 16;
  sm: 20;
  md: 24;
  lg: 32;
};

export type SizesType = { icons: iconsType };

export const Sizes: SizesType = {
  icons: { xs: 16, sm: 20, md: 24, lg: 32 },
};

export type IconNames =
  | ''
  | 'add'
  | 'arrow-bottom'
  | 'arrow-bottom-fill'
  | 'arrow-down-1'
  | 'arrow-left'
  | 'arrow-up'
  | 'arrow-up-fill'
  | 'arrow-up-2'
  | 'arrow-right'
  | 'barcode'
  | 'box'
  | 'bold'
  | 'building'
  | 'calendar-1'
  | 'call-calling'
  | 'car'
  | 'check'
  | 'chart-3'
  | 'clipboard-close'
  | 'clipboard-text'
  | 'close'
  | 'copy-success'
  | 'danger'
  | 'document-copy'
  | 'document-filter'
  | 'document-forward'
  | 'document-previous'
  | 'document-text'
  | 'document-upload'
  | 'dollar-circle'
  | 'edit-2'
  | 'edit'
  | 'element-4'
  | 'eye-slash'
  | 'eye'
  | 'flag'
  | 'frame-1'
  | 'gallery'
  | 'gps'
  | 'history'
  | 'home-hashtag'
  | 'italic'
  | 'link'
  | 'location'
  | 'lock-1'
  | 'logout-1'
  | 'megaphone'
  | 'menu-1'
  | 'message-question'
  | 'messages'
  | 'mobile'
  | 'more'
  | 'notification-1'
  | 'notification-bing'
  | 'ol'
  | 'pause-circle'
  | 'people'
  | 'play-circle'
  | 'profile-2user'
  | 'receipt-item'
  | 'search-normal-1'
  | 'setting'
  | 'shopping-cart'
  | 'sign-post'
  | 'sms'
  | 'sort'
  | 'status'
  | 'trash'
  | 'truck-fast'
  | 'underline'
  | 'ul'
  | 'tick-circle'
  | 'transaction-minus'
  | 'user-octagon'
  | 'user'
  | 'warning-2'
  | 'refresh-2'
  | 'stars';

export type IconProps = {
  color?: string;
  size?: keyof SizesType['icons'];
  className?: string;
  id?: string;
  name: IconNames;
};

export type IconSymbolsProps = {
  icons?: Array<IconProps['name']>; // Icons whitelist
};
