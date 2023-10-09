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
const DropDownCampaignCard: FC<DropDownProps> = ({ children, toggle, isOpen, onClose }) => {
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
      className="w-10 h-10 p-2 bg-white rounded-lg border border-black border-opacity-10 justify-center items-center gap-2.5 inline-flex relative"
      ref={ref}
    >
      <Button
        variant="text"
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

export default DropDownCampaignCard;
