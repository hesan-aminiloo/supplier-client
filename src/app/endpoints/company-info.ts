// TODO: Replace real endpoints

// eslint-disable-next-line prefer-destructuring
const BASE_URL = import.meta.env.BASE_URL;

export const getCompanyInfo = () => `${BASE_URL}/company-info`;

export const editCompanyInfo = (id: string) => `${BASE_URL}/company-info/${id}`;
