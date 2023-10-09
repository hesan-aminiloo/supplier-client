import { Theme } from '@src/style';
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import { useDropzone, FileRejection } from 'react-dropzone';
import { useController, useFormContext } from 'react-hook-form';

import { Icon } from '../icon';
import { IFileUploaderProps } from './FileUploader.types';
import { ACCEPT_FORMATS, DEFAULT_FORMATS, DEFAULT_SIZE } from './FileUploader.constants';

export const FileUploader = ({ className, onSelectFile, control, name, helperText }: IFileUploaderProps) => {
  const context = useFormContext();
  const { field } = useController({
    name: name || 'file',
    control: context?.control || control,
  });
  const [status, setStatus] = useState<'error' | null>();
  const [error, setError] = useState<string>();

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    setStatus(null);
    if (acceptedFiles.length > 0) {
      onSelectFile(acceptedFiles);
    }

    if (rejectedFiles.length > 0) {
      setStatus('error');
      const errorsCodes = rejectedFiles[0].errors.map((errorMessage) => errorMessage.code);
      switch (true) {
        case errorsCodes.includes('too-many-files'):
          setError('Too many files selected');
          break;
        case errorsCodes.includes('file-invalid-type'):
          setError(`invalid file type, accepted types are: ${DEFAULT_FORMATS}`);
          break;
        case errorsCodes.includes('file-too-large'):
          setError(`File size is too large, ${DEFAULT_SIZE}`);
          break;
        default:
          setError('something went wrong in uploading file, try again');
          break;
      }
    }
    // Do something with the files
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 1000000,
    maxFiles: 1,
    accept: ACCEPT_FORMATS,
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        'drag-file-area bg-neutral-200 rounded-xl mt-6 p-6 flex items-center flex-col justify-center border-2 border-dashed border-neutral-400 mb-6 cursor-pointer',
        className
      )}
    >
      <input
        {...getInputProps()}
        onChange={field.onChange}
        type="file"
      />
      <Icon
        name="document-upload"
        size="lg"
        color={Theme.colors.primary500}
        className="mb-5"
      />

      <div className="text-base">
        <span className="text-primary-500">Upload logo</span>
        {!isDragActive && <span className="text-neutral-900"> or drag and drop</span>}
      </div>

      {status !== 'error' && (
        <span className="text-neutral-500 text-sm mt-1">
          {DEFAULT_FORMATS} {DEFAULT_SIZE}
        </span>
      )}

      {!!helperText && status !== 'error' && (
        <span className="inline-block pt-2 text-neutral-500 font-normal text-xs">{helperText}</span>
      )}
      {status === 'error' && <span className="text-destructive-500 inline-block pt-2 text-xs">{error}</span>}
    </div>
  );
};
