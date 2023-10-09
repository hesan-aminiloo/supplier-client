import Background from '@src/assets/images/login_background.webp';
import CarImage from '@src/assets/images/car_background.webp';
import { useTranslation } from 'react-i18next';

export const RightSide = () => {
  const { t } = useTranslation();
  return (
    <div
      className="w-1/2 h-screen bg-cover"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="w-full h-full flex flex-col justify-center items-center">
        <img
          src={CarImage}
          alt="Login page"
          width={600}
          height={200}
        />
        <p className="w-3/5 text-white text-center text-3xl font-bold mt-11">
          {t('auth.the-bridge-between-suppliers')}
        </p>
        <p className="w-3/5 text-lg font-inter text-primary-100 text-center mt-4">
          {t('auth.my-parts-locator-connects')}
        </p>
      </div>
    </div>
  );
};
