export interface GarageType {
  id: number;
  name: string;
}
export interface StatementItemType {
  id: number;
  branch_billing_id: number;
  account_id: number;
  users_count: number;
  garage: GarageType;
}

export type StatementListType = Array<StatementItemType>;
export interface BillingItemsType {
  id: number;
  create_date: string;
  name: string;
  currency: string;
  statment: StatementListType;
  branch_seats: number;
  users_seats: number;
}

export interface BillingsMetaType {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}

export interface BillingListType {
  data: Array<BillingItemsType>;
  meta: BillingsMetaType;
}

export interface PricingType {
  branch_cost: number;
  symbol: string;
  user_cost: number;
}
export interface PricingAndBillingFilterData {
  date?: string;
  page?: number;
}

export interface CurrentMonthDataType {
  branch_count: number;
  invoice_total: string;
  user_count: string;
}
export interface PricingAndBillingResponse {
  billings: BillingListType;
  pricing: PricingType | {};
  currentMonthData: Array<CurrentMonthDataType> | [];
  nextInvoiceDate: string;
}
