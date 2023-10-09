export type OptionItemProps = { id: string; label: string };

export type Items = {
  itemsList: OptionItemProps[];
  activeTabId: string;
  onChange: (value: OptionItemProps) => void;
  className?: string;
};
