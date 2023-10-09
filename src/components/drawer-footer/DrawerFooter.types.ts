export type PopUpConfigType = {};

export type DrawerFooterProps = {
  title?: string;
  hasDelete?: boolean;
  onDelete?: (e: any) => void;
  onSubmit: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};
