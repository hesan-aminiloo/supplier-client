export type NotificationSettingsOption = {
  label: string;
  id: string;
  checked: boolean;
};

export type NotificationSettingsItemProps = NotificationSettingsOption & {
  onChange: (id: string, value: boolean) => void;
  className?: string;
};
