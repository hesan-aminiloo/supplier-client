import avatar from './Avatar.png';

export const GARAGE_CUSTOMERS_MOCK_DATA = {
  garage: {
    logo: avatar,
    name: 'Abstergo Ltd.',
    branch: 'BranchName',
    phone: '+44-775-552-53',
    email: 'CoolCompany@mail.io',
    address: 'SomeCoolAddresLine #11, London, UK',
    postCode: '0159',
  },
  contacts: [
    { id: 1, name: 'Alan' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Lana' },
    { id: 4, name: 'Brian' },
  ],
  statistics: [
    { month: 'dec', quotes: 113, orders: 100, income: 228.78, rate: { value: '5%', isGreen: true } },
    { month: 'jan', quotes: 233, orders: 145, income: 757.33, rate: { value: '2%', isGreen: false } },
    { month: 'feb', quotes: 145, orders: 321, income: 644.62, rate: { value: '3%', isGreen: true } },
    { month: 'mar', quotes: 453, orders: 332, income: 975.91, rate: { value: '5%', isGreen: true } },
    { month: 'apr', quotes: 564, orders: 453, income: 573.69, rate: { value: '5%', isGreen: false } },
    { month: 'may', quotes: 123, orders: 99, income: 725.52, rate: { value: '3%', isGreen: false } },
    { month: 'jun', quotes: 453, orders: 371, income: 443.92, rate: { value: '5%', isGreen: true } },
    { month: 'jul', quotes: 324, orders: 245, income: 351.99, rate: { value: '5%', isGreen: true } },
  ],
};

export const GARAGE_CUSTOMER_CONTACT_MOCK_DATA = {
  id: 1,
  name: 'Abstergo Ltd.',
  phone: '+44-775-552-53',
  phoneModel: 'Samsung Galaxy S8',
  email: 'CoolCompany@mail.io',
  status: 'active',
  address: 'Great Britain, London',
  lastLog: '07.04.2023 - 14:15',
  firstLog: '11.02.2022 - 14:15',
  statistics: [
    { month: 'dec', quotes: 113, orders: 100, income: 228.78, rate: { value: '5%', isGreen: true } },
    { month: 'jan', quotes: 233, orders: 145, income: 757.33, rate: { value: '2%', isGreen: false } },
    { month: 'feb', quotes: 145, orders: 321, income: 644.62, rate: { value: '3%', isGreen: true } },
    { month: 'mar', quotes: 453, orders: 332, income: 975.91, rate: { value: '5%', isGreen: true } },
    { month: 'apr', quotes: 564, orders: 453, income: 573.69, rate: { value: '5%', isGreen: false } },
    { month: 'may', quotes: 123, orders: 99, income: 725.52, rate: { value: '3%', isGreen: false } },
    { month: 'jun', quotes: 453, orders: 371, income: 443.92, rate: { value: '5%', isGreen: true } },
    { month: 'jul', quotes: 324, orders: 245, income: 351.99, rate: { value: '5%', isGreen: true } },
  ],
};
