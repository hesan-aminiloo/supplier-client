## How to use icons

First, you need to add the icons component like so:

```javascript
import { Icon } from '@src/components';
```

This component has 1 mandatory argument: `name`, you can see the list below for available options

Then inside the component you can do this:

```javascript
import React from 'react';

const SomeComponent = () => {
  return (
    <div>
      <h1>Some component title</h1>
      <Icon
        name="building"
        size="md"
      />
    </div>
  );
};
```

You can also add custom classNames to icon component like so

```javascript
<Icon
  name="building"
  size="md"
  className="ml-4"
/>
```

You can pass colors to icon component

```javascript
<Icon
  name="building"
  size="md"
  color="#f00"
/>
```

by default icon color is `black`

<br />

### List of available icons

- `add`
- `arrow-bottom`
- `arrow-bottom-fill`
- `arrow-down-1`
- `arrow-left`
- `arrow-up`
- `arrow-up-fill`
- `arrow-up-2`
- `arrow-right`
- `barcode`
- `box`
- `building`
- `calendar-1`
- `call-calling`
- `car`
- `chart-3`
- `clipboard-close`
- `clipboard-text`
- `close`
- `copy-success`
- `danger`
- `document-copy`
- `document-filter`
- `document-forward`
- `document-text`
- `document-upload`
- `dollar-circle`
- `edit-2`
- `edit`
- `element-4`
- `eye-slash`
- `eye`
- `flag`
- `frame-1`
- `gallery`
- `gps`
- `home-hashtag`
- `location`
- `lock-1`
- `logout-1`
- `menu-1`
- `message-question`
- `messages`
- `mobile`
- `notification-1`
- `notification-bing`
- `pause-circle`
- `people`
- `play-circle`
- `profile-2user`
- `receipt-item`
- `search-normal-1`
- `setting`
- `shopping-cart`
- `sign-post`
- `sms`
- `sort`
- `status`
- `trash`
- `truck-fast`
- `tick-circle`
- `user-octagon`
- `user`
- `warning-2`

<br />
<br />
<br />

## How to add new icons

First create a `.tsx` file inside `src/components/icons` directory and then use the following template and replace the `path` elements and add `fill` and `fillRule` attributes to every `path` elements

```javascript
export const AddIcon = () => (
  <symbol
    id="add-icon" // ==> HERE set the name of the icon, Note: Keep the -icon postfix
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      stroke="none"
      fillRule="evenodd"
    >
      <path
        d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
        fill="current" // ==> Set the fill property to current
        fillRule="nonzero" // ==> Set the fillRule property to nonzero
      />
      <path
        d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z"
        fill="current"
        fillRule="nonzero"
      />
    </g>
  </symbol>
);
```

`add.tsx`

<br />

_NOTE: use lowecase naming for every file inside icons folder_

_NOTE: the symbol id MUST match the icon union type `IconNames`_

<br />

then export the icon in `src/components/icons/index.ts`

```javascript
export * from './add';
```

Remember to follow alphabetical order

then add the icon name to `IconNames` union type name inside `src/components/icon/Icon.types.ts` like so:

```javascript
  export type IconNames =
  | ''
  | 'add' ==> ADD THIS without `-icon`
  | 'arrow-down-1'
  | 'arrow-left'
  | 'building'
  | 'call-calling'
  | 'chart-3'
  | 'clipboard-text'
  | 'close'
  | 'document-upload'
  | 'edit2'
  | 'element-4'
  | 'flag'
  | 'frame-1'
  | 'gps'
  | 'home-hashtag'
  | 'location'
  | 'logout-1'
  | 'menu-1'
  | 'mobile'
  | 'notification-1'
  | 'notification-bing'
  | 'people'
  | 'profile-2user'
  | 'receipt-item'
  | 'setting'
  | 'sign-post'
  | 'sms'
  | 'sort'
  | 'trash';
```

<br />

Then finally add the icon name inside `src/components/icon/IconSymbols.tsx` like so:

```javascript
export const IconSymbols: FC<IconSymbolsProps> = () => {
  return (
    <svg className="d-none">
      <Icons.AddIcon /> // ADD THIS
      <Icons.ArrowDown1Icon />
      <Icons.ArrowLeftIcon />
      <Icons.BuildingIcon />
      <Icons.CallCallingIcon />
      <Icons.Chart3Icon />
      <Icons.ClipboardTextIcon />
      <Icons.CloseIcon />
      <Icons.DocumentUploadIcon />
      <Icons.Edit2Icon />
      <Icons.Element4Icon />
      <Icons.FlagIcon />
      <Icons.Frame1Icon />
      <Icons.GpsIcon />
      <Icons.HomeHashtagIcon />
      <Icons.LocationIcon />
      <Icons.Logout1Icon />
      <Icons.Menu1Icon />
      <Icons.MobileIcon />
      <Icons.Notification1Icon />
      <Icons.NotificationBingIcon />
      <Icons.PeopleIcon />
      <Icons.Profile2UserIcon />
      <Icons.ReceiptItemIcon />
      <Icons.SettingIcon />
      <Icons.SignpostIcon />
      <Icons.SmsIcon />
      <Icons.SortIcon />
      <Icons.TrashIcon />
    </svg>
  );
};
```
