export type SiteConfigs = {
  SITE_URL: string;
  BASE_API_URL: string;
  IMAGE_BASE_URL: string;
  PROJECT_PHASE?: 'development' | 'test' | 'build' | 'production';
  TOKEN_COOKIE_KEY?: string;
  INSTANCE_ID: string;
};
