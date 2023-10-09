import type { FC } from 'react';

type BooleanLike = boolean | string | number | null | undefined;

type RenderWhenProps = {
  is: BooleanLike;
  children: React.ReactNode | undefined | Function;
};

const getConditionResult = (condition: BooleanLike | ((...args: unknown[]) => BooleanLike)): boolean => {
  return Boolean(typeof condition === 'function' ? condition() : condition);
};

const RenderWhen: FC<RenderWhenProps> = ({ children, is }) => {
  if (!children) return null;

  const conditionResult = getConditionResult(is);

  return <>{conditionResult ? (typeof children === 'function' ? children() : children) ?? null : null}</>;
};

export default RenderWhen;
