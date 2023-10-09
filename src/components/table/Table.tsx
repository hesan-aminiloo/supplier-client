import React, { FC } from 'react';
import { TableProps } from '@components/table';
import clsx from 'clsx';
import { getColumnClassName } from '@components/table/Table.tools';
import { useTranslation } from 'react-i18next';

export const Table: FC<TableProps> = ({ className, thClassName, columns, rows }) => {
  const { t } = useTranslation();
  const columnsFields = columns.map((col) => col.field);
  return (
    <table className={clsx('table-auto w-full, ', className)}>
      <thead>
        <tr>
          {columns.map((header, index) => (
            <th
              key={header.field}
              className={clsx(
                'bg-neutral-100 text-neutral-500 font-medium  p-4  pl-8 py-3 lg:pl-3 text-left border-b border-stroke-3',
                {
                  'rounded-tl-xl': index === 0,
                  'rounded-tr-xl': index === columns.length - 1,
                },
                thClassName
              )}
            >
              {typeof header.title === 'string' ? t(header.title) : header.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {rows.map((row, rowIndex) => (
          <tr key={row.id}>
            {row.data.map(({ field, data }, columnIndex) => {
              if (!columnsFields.includes(field)) {
                return null;
              }
              return (
                <td
                  key={`${field}`}
                  className={getColumnClassName(rowIndex, columnIndex, row.data.length, rows.length, row.className)}
                >
                  {data}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
