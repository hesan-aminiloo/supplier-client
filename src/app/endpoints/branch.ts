// TODO: Replace real endpoints

// eslint-disable-next-line prefer-destructuring
const BASE_URL = import.meta.env.BASE_URL;

export const addBranch = () => `${BASE_URL}/branch`;

export const editBranch = (id: string) => `${BASE_URL}/branch/${id}`;

export const getSingleBranch = (id: string) => `${BASE_URL}/branch/${id}`;

export const getAllBranches = () => `${BASE_URL}/branches`;

export const getBranches = `/branch`;
