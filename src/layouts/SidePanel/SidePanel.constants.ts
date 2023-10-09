import {
  GARAGE_CUSTOMERS_PAGE_PATH,
  LOGOUT_PAGE_PATH,
  NOTIFICATIONS_PAGE_PATH,
  REQUESTS_PAGE_PATH,
  SETTINGS_PAGE_PATH,
  STATS_PAGE_PATH,
  MARKETING_PAGE_PATH,
} from '@src/utils';
import { SideMenuItemPropsI } from './SidePanel.types';

export const MENU_ITEMS: SideMenuItemPropsI[] = [
  { id: 'requests', label: 'side_menu.requests', to: REQUESTS_PAGE_PATH, icon: 'clipboard-text' },
  { id: 'garage', label: 'side_menu.garage_customers', to: GARAGE_CUSTOMERS_PAGE_PATH, icon: 'people' },
  { id: 'statistics', label: 'side_menu.statistics_analytics', to: STATS_PAGE_PATH, icon: 'chart-3' },
  { id: 'notifications', label: 'side_menu.notifications', to: NOTIFICATIONS_PAGE_PATH, icon: 'notification-bing' },
  { id: 'marketing', label: 'side_menu.marketing', to: MARKETING_PAGE_PATH, icon: 'megaphone' },
  { id: 'settings', label: 'side_menu.settings', to: SETTINGS_PAGE_PATH, icon: 'setting' },
  { id: 'logout', label: 'side_menu.logout', to: LOGOUT_PAGE_PATH, icon: 'logout-1' },
];
