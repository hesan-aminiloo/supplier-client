import clsx from 'clsx';
import { FC } from 'react';

interface Props {
  classNames?: string;
}

const Loading: FC<Props> = ({ classNames }) => {
  return <div className={clsx('text-center mt-8 w-full', classNames)}>Loading...</div>;
};

export default Loading;
