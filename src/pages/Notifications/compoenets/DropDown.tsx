/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Icon } from '@src/components';
import { Theme } from '@src/style';
import { FC, ReactNode, useEffect, useRef } from 'react';

interface DropDownProps {
  children: ReactNode;
  toggle: () => void;
  isOpen: boolean;
  onClose: () => void;
}
const DropDownNotificationCard: FC<DropDownProps> = ({ children, toggle, isOpen, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div
      className="relative"
      ref={ref}
    >
      <Button
        variant="tertiary"
        size="md"
        onClick={toggle}
      >
        <Icon
          name="more"
          size="xs"
          color={Theme.colors.neutral600}
        />
      </Button>
      {isOpen && children}
    </div>
  );
};

export default DropDownNotificationCard;
