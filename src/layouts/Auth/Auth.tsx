import { FC } from 'react';
import AUTH_MY_PARTS_LOCATOR_LOGO from '@src/assets/images/my_parts_locator_logo.webp';
import { IAuthLayoutProps } from './Auth.types';
import { RightSide } from './RightSide';

export const AuthLayout: FC<IAuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 bg-neutral-200 px-24 py-16">
        <div>
          <img
            src={AUTH_MY_PARTS_LOCATOR_LOGO}
            alt="Parts locator app"
            width={133}
            height={48}
          />
        </div>
        <div className="h-full flex flex-col justify-center">{children}</div>
      </div>
      <RightSide />
    </div>
  );
};
