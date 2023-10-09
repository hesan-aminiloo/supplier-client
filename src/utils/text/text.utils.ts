import i18next from 'i18next';

// the maximum of length is 30
export const GENERATE_RANDOM_ID_DEFAULT_LENGTH = 8;
export const generateRandomId: (length?: number) => string = (length = GENERATE_RANDOM_ID_DEFAULT_LENGTH) => {
  const randomId = (new Date().getTime() * (1 + Math.random()) * 100000).toString(16);

  return `${randomId}${randomId}`.slice(0, length);
};

export const generateRandomPassword = ({ length = 8 }: { length?: number }) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&()*+-./-';
  let retVal = '';
  for (let i = 0, n = charset.length; i < length; i += 1) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

export const generateMonthName = (monthNumber: number) => {
  switch (monthNumber) {
    case 1:
      return i18next.t('shared.months.jan');
    case 2:
      return i18next.t('shared.months.feb');
    case 3:
      return i18next.t('shared.months.mar');
    case 4:
      return i18next.t('shared.months.apr');
    case 5:
      return i18next.t('shared.months.may');
    case 6:
      return i18next.t('shared.months.jun');
    case 7:
      return i18next.t('shared.months.jul');
    case 8:
      return i18next.t('shared.months.aug');
    case 9:
      return i18next.t('shared.months.sep');
    case 10:
      return i18next.t('shared.months.oct');
    case 11:
      return i18next.t('shared.months.nov');
    default:
      return i18next.t('shared.months.dec');
  }
};

export const generateMinutesToHours = (minutes: number) => {
  const restMinutes = minutes % 60;
  const hours = Math.floor(minutes / 60);
  return `${hours > 0 ? `${hours}h` : ''} ${restMinutes > 0 ? `${restMinutes}m` : ''}`;
};

export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
};
