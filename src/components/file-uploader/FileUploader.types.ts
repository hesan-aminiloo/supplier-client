import { Control } from 'react-hook-form';

export interface IFileUploaderProps {
  name?: string;
  className?: string;
  onSelectFile: (files: File[]) => void;
  control?: Control<any>;
  helperText?: string;
}
