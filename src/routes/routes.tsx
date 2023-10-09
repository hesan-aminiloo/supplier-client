// import { lazy } from 'react';
import { lazy } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

// Layouts
import { ProtectedRoute, WithSuspense } from '@src/components';
import { SettingsLandingSkeleton } from '@src/pages/Settings/SettingsLanding/SettingsLanding.skeleton';
import { SystemUsersSkeleton } from '@src/pages/Settings/SystemUsers/SystemUsers.skeleton';
import { RequestsSkeleton } from '@src/pages/Request/RequestsList/Requests.skeleton';
import { GarageCustomersSkeleton } from '@src/pages/GarageCustomers/GarageCustomers.skeleton';
import { GarageCustomerDetailsSkeleton } from '@src/pages/GarageCustomerDetails/GarageCustomerDetails.skeleton';
import { CompanyInfoSkeleton } from '@src/pages/Settings/CompanyInfo/CompanyInfo.skeleton';
import { NotificationSettingsSkeleton } from '@src/pages/Settings/NotificationSettings/NotificationSettings.skeleton';
import { NotificationsSkeleton } from '@src/pages/Notifications/Notifications.skeleton';
import { RequestDetailsSkeleton } from '@src/pages/Request/RequestDetails';
import { StatsSkeleton } from '@src/pages/Stats';
import { CreateMarketingNotifSkeleton } from '@src/pages/Marketing/CreateNotif';

import { CampaignListSkeleton } from '@src/pages/Marketing/CampaignList';
import { ForgotPassword } from '@src/pages/ForgotPassword';
import { NewPassword } from '@src/pages/NewPassword';
import { Login } from '@src/pages/Login';
import { NotFound } from '@src/pages/NotFound';
import { Logout } from '@src/pages/Logout';
import {
  COMPANY_INFO_PAGE_PATH,
  FORGET_PASSWORD_PATH,
  GARAGE_CUSTOMERS_PAGE_PATH,
  HOME_PAGE_PATH,
  NOTIFICATIONS_PAGE_PATH,
  REQUESTS_PAGE_PATH,
  SETTINGS_PAGE_PATH,
  STATS_PAGE_PATH,
  MARKETING_PAGE_PATH,
  SYSTEM_USERS_PAGE_PATH,
  ACCOUNT_DETAILS_PAGE_PATH,
  NEW_PASSWORD_PAGE_PATH,
  NOTIFICATIONS_SETTINGS_PAGE_PATH,
  LOGOUT_PAGE_PATH,
  REQUEST_DETAILS_PAGE_PATH,
  PRICING_AND_BILLING_PAGE_PATH,
  NOT_FOUND_PAGE_PATH,
  CAMPAIGNS_PAGE_PATH,
} from '@src/utils';
import { useStore } from 'zustand';
import { coreStore } from '@src/store/core';
import PricingAndBilling from '@src/pages/Settings/PricingAndBilling/PricingAndBilling';
import GarageRequestsList from '@src/pages/Request/RequestsList/GarageRequestsList';

const CampaignList = lazy(() => import('@src/pages/Marketing/CampaignList'));
const Stats = lazy(() => import('@src/pages/Stats'));
const Requests = lazy(() => import('@src/pages/Request/RequestsList'));
const RequestDetails = lazy(() => import('@src/pages/Request/RequestDetails'));
const SettingsLanding = lazy(() => import('@src/pages/Settings/SettingsLanding'));
const SystemUsers = lazy(() => import('@src/pages/Settings/SystemUsers'));
const CompanyInfo = lazy(() => import('@src/pages/Settings/CompanyInfo'));
const Notifications = lazy(() => import('@src/pages/Notifications'));
const GarageCustomers = lazy(() => import('@src/pages/GarageCustomers'));
const GarageCustomerDetails = lazy(() => import('@src/pages/GarageCustomerDetails'));
const AccountDetails = lazy(() => import('@src/pages/Settings/AccountDetails'));
const NotificationSettings = lazy(() => import('@src/pages/Settings/NotificationSettings'));
const MarketingCreateNotif = lazy(() => import('@src/pages/Marketing/CreateNotif'));

const DefaultLoading = () => (
  <div className="h-screen w-screen flex items-center justify-center">
    <h1>Loading...</h1>
  </div>
);

export const Router = () => {
  const user = useStore(coreStore);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={HOME_PAGE_PATH}
          element={<Login />}
        />
        <Route
          path={NOT_FOUND_PAGE_PATH}
          element={<NotFound />}
        />
        <Route
          path={REQUESTS_PAGE_PATH}
          element={
            <ProtectedRoute condition={!!user.token}>
              <WithSuspense
                children={<Requests />}
                loading={<RequestsSkeleton />}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path={`${GARAGE_CUSTOMERS_PAGE_PATH}/:garageId${REQUESTS_PAGE_PATH}/:time`}
          element={
            <ProtectedRoute condition={!!user.token}>
              <WithSuspense
                children={<GarageRequestsList />}
                loading={<RequestsSkeleton />}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path={REQUEST_DETAILS_PAGE_PATH}
          element={
            <ProtectedRoute condition={!!user.token}>
              <WithSuspense
                children={<RequestDetails />}
                loading={<RequestDetailsSkeleton />}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path={GARAGE_CUSTOMERS_PAGE_PATH}
          element={
            <ProtectedRoute condition={!!user.token}>
              <WithSuspense
                children={<GarageCustomers />}
                loading={<GarageCustomersSkeleton />}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path={`${GARAGE_CUSTOMERS_PAGE_PATH}/:garageId`}
          element={
            <ProtectedRoute condition={!!user.token}>
              <WithSuspense
                children={<GarageCustomerDetails />}
                loading={<GarageCustomerDetailsSkeleton />}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path={STATS_PAGE_PATH}
          element={
            <ProtectedRoute condition={!!user.token}>
              <WithSuspense
                children={<Stats />}
                loading={<StatsSkeleton />}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path={MARKETING_PAGE_PATH}
          element={
            <ProtectedRoute condition={!!user.token}>
              <WithSuspense
                children={<MarketingCreateNotif />}
                loading={<CreateMarketingNotifSkeleton />}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path={CAMPAIGNS_PAGE_PATH}
          element={
            <ProtectedRoute condition={!!user.token}>
              <WithSuspense
                children={<CampaignList />}
                loading={<CampaignListSkeleton />}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path={NOTIFICATIONS_PAGE_PATH}
          element={
            <ProtectedRoute condition={!!user.token}>
              <WithSuspense
                children={<Notifications />}
                loading={<NotificationsSkeleton />}
              />
            </ProtectedRoute>
          }
        />
        <Route path={SETTINGS_PAGE_PATH}>
          <Route
            path={SETTINGS_PAGE_PATH}
            element={
              <ProtectedRoute condition={!!user.token}>
                <WithSuspense
                  children={<SettingsLanding />}
                  loading={<SettingsLandingSkeleton />}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${SETTINGS_PAGE_PATH}/${COMPANY_INFO_PAGE_PATH}`}
            element={
              <ProtectedRoute condition={!!user.token && !!user.permissions?.[COMPANY_INFO_PAGE_PATH]?.view}>
                <WithSuspense
                  children={<CompanyInfo />}
                  loading={<CompanyInfoSkeleton />}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${SETTINGS_PAGE_PATH}/${NOTIFICATIONS_SETTINGS_PAGE_PATH}`}
            element={
              <ProtectedRoute condition={!!user.token && !!user.permissions?.[NOTIFICATIONS_SETTINGS_PAGE_PATH]?.view}>
                <WithSuspense
                  children={<NotificationSettings />}
                  loading={<NotificationSettingsSkeleton />}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${SETTINGS_PAGE_PATH}/${SYSTEM_USERS_PAGE_PATH}`}
            element={
              <WithSuspense
                children={
                  <ProtectedRoute condition={!!user.token && !!user.permissions?.[SYSTEM_USERS_PAGE_PATH]?.view}>
                    <SystemUsers />
                  </ProtectedRoute>
                }
                loading={<SystemUsersSkeleton />}
              />
            }
          />
          <Route
            path={`${SETTINGS_PAGE_PATH}/${ACCOUNT_DETAILS_PAGE_PATH}`}
            element={
              <WithSuspense
                children={
                  <ProtectedRoute condition={!!user.token && !!user.permissions?.[ACCOUNT_DETAILS_PAGE_PATH]?.view}>
                    <AccountDetails />
                  </ProtectedRoute>
                }
                loading={<DefaultLoading />}
              />
            }
          />
          <Route
            path={`${SETTINGS_PAGE_PATH}/${PRICING_AND_BILLING_PAGE_PATH}`}
            element={
              <WithSuspense
                children={
                  <ProtectedRoute condition={!!user.token && !!user.permissions?.[PRICING_AND_BILLING_PAGE_PATH]?.view}>
                    <PricingAndBilling />
                  </ProtectedRoute>
                }
                loading={<DefaultLoading />}
              />
            }
          />
        </Route>

        <Route
          path={FORGET_PASSWORD_PATH}
          element={<ForgotPassword />}
        />
        <Route
          path={NEW_PASSWORD_PAGE_PATH}
          element={<NewPassword />}
        />
        <Route
          path={LOGOUT_PAGE_PATH}
          element={<Logout />}
        />
      </Routes>
    </BrowserRouter>
  );
};
