import { Icon } from '@src/components';
import { Theme } from '@src/style';
import { FC } from 'react';
// Hooks
import { useTranslation } from 'react-i18next';

// Components and utility hooks
import { Link } from 'react-router-dom';
import { SettingsItemProps } from './SettingsLanding.types';

export const SettingsItem: FC<SettingsItemProps> = (props) => {
  const { icon, to, title, description, isHidden } = props;
  const { t } = useTranslation();
  return !isHidden ? (
    <Link to={to}>
      <div className="flex flex-col bg-white border border-stroke-4 p-6 rounded-xl shadow-xs h-44">
        <div className="mb-5">
          <Icon
            name={icon}
            size="lg"
            color={Theme.colors.primary500}
          />
        </div>
        <div>
          <h3 className="font-extrabold text-xl mb-2 text-neutral-900">{t(title as string)}</h3>
          <p className="font-normal text-neutral-400 text-sm">{t(description as string)}</p>
        </div>
      </div>
    </Link>
  ) : null;
};
