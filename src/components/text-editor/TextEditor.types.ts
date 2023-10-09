import { ReactNode } from 'react';

export type InputStatus = 'error' | 'none' | 'valid';
export interface ITextEditorProps {
  label?: string;
  content?: string;
  className?: string;
  helperText?: string;
  status?: InputStatus;
  error?: string;
}

export interface IMenuItemProps {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
  disabled: boolean;
}
