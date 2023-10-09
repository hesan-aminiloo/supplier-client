import { forwardRef, ForwardRefRenderFunction } from 'react';

// Utils
import { Icon } from '@src/components/icon';
import { useToggle } from 'react-use';

import { PasswordProps } from './PasswordInput.types';
import { Input } from '../input';

const RightIcon = ({ onClick, visible, locked }: { onClick: () => void; visible: boolean; locked?: boolean }) =>
  locked ? (
    <></>
  ) : (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="border-none bg-transparent block"
      onClick={() => {
        onClick();
      }}
    >
      <Icon
        name={visible ? 'eye-slash' : 'eye'}
        size="sm"
      />
    </div>
  );

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, PasswordProps> = (props, ref) => {
  const { locked = false, ...restProps } = props;
  const [visibility, toggleVisibility] = useToggle(false);

  return (
    <Input
      ref={ref}
      type={visibility ? 'text' : 'password'}
      rightIcon={
        <RightIcon
          locked={locked}
          onClick={toggleVisibility}
          visible={visibility}
        />
      }
      {...restProps}
    />
  );
};

export const PasswordInput = forwardRef(InputComponent);
