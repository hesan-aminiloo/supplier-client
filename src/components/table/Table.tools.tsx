import clsx from 'clsx';

export const getColumnClassName = (
  rowIndex: number,
  columnIndex: number,
  dataLength: number,
  rowLength: number,
  rowClassName?: string
) => {
  return clsx(
    'p-4 pl-8 lg:pl-4 text-neutral-700',
    {
      'rounded-br-xl': rowIndex === rowLength - 1 && columnIndex === dataLength - 1,
      'rounded-bl-xl': rowIndex === rowLength - 1 && columnIndex === 0,
      'border-b border-stroke-3': rowIndex !== rowLength - 1,
    },
    rowClassName
  );
};
