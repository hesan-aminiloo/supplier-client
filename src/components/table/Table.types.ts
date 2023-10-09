import { ReactNode } from 'react';

export type TableColumn = {
  field: string;
  title: string | ReactNode;
};

export type TableRow = {
  id: string | number;
  className?: string;
  data: {
    field: string;
    data: string | number | ReactNode;
  }[];
};

export type TableProps = {
  className?: string;
  thClassName?: string;
  columns: TableColumn[];
  rows: TableRow[];
};
