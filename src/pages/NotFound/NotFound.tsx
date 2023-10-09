import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@src/components';
import { HOME_PAGE_PATH } from '@src/utils';
import NotFoundImage from './assets/NotFoundImage';

export const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="h-screen py-8 w-100 ">
      <div className="bg-white h-full rounded-xl flex flex-col items-center justify-center">
        <NotFoundImage />
        <p className="font-bold text-xl mt-10">{t('not_found.title')}</p>
        <p className="max-w-[364px] text-sm mt-2 text-center text-neutral-500">{t('not_found.description')}</p>
        <Link to={HOME_PAGE_PATH}>
          <Button className="mt-10">{t('not_found.go_to_home_page')}</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
