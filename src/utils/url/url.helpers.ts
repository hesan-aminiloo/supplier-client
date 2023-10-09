import qs from 'qs';
import { SITE_CONFIGS } from '@src/configs';

export function getQueryParams() {
  const searchParams = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  return searchParams;
}

export const convertJsonToQueryString = (json: any): string => {
  let queryString = '';
  const stringCount = Object.keys(json).length - 1;
  Object.keys(json).forEach((item, index) => {
    if (json[item] || json[item] !== '') {
      queryString += `${item}=${json[item]}${index < stringCount ? '&' : ''}`;
    }
  });
  if (queryString[queryString.length - 1] === '&') {
    queryString = queryString.substring(0, queryString.length - 1);
  }
  return queryString;
};

export const generateImageUrl = (url?: string) => {
  if (url?.[0] !== '/') {
    url = `/${url}`;
  }
  if (url) {
    return SITE_CONFIGS.IMAGE_BASE_URL + url;
  }

  return '';
};
