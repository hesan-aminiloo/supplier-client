// Components and Hooks
import { useNavigate } from 'react-router-dom';

// Icons
import { Theme } from '@src/style';
import { Icon } from './icon';
import { Button } from './button';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(-1)}
      variant="secondary"
      color="indigo"
      className="inline-block rounded-lg bg-neutral-200"
    >
      <Icon
        name="arrow-left"
        size="sm"
        color={Theme.colors.neutral500}
      />
    </Button>
  );
};

export default BackButton;
