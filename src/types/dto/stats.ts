export interface ICustomerActivityCharts {
  year: number;
  month: number;
  quotes: string;
  orders: string;
}

export interface ICustomerActivity {
  logo: string;
  name: string;
  orders: string;
  quotes: string;
  value: number;
}

export interface ILostQuotes {
  missed: number;
  total: number;
}

export interface ResponseTime {
  minutes: string;
  total: number;
}

export interface IOverallRevenue {
  year: number;
  month: number;
  total: number;
}

export interface IGarageOverallRevenue {
  year: number;
  month: number;
  total: string;
}

export interface IGarageMonthlyIncome {
  year: number;
  month: number;
  orders: string;
  quotes: string;
  total: string;
}

export interface ISalesReport {
  year: number;
  month: number;
  orders: string;
  quotes: string;
}

export interface ISalesOfBranch {
  value: number;
  name: string;
  percent: number;
}

export interface ICostsAnalyze {
  branches: string;
  users: string;
}

export interface IStats {
  quotes: string;
  orders: string;
  totalRequests: number;
  totalUsers: number;
  totalSales: number;
  sales: {
    total: number | null;
  }[];
  customersActivityChart: ICustomerActivityCharts[];
  customersActivity: ICustomerActivity[];
  responseTime: ResponseTime;
  lostQuotes: ILostQuotes;
  overalRevenue: IOverallRevenue[];
  salesReport: ISalesReport[];
  analysisOfGarages: number;
  salesOfBranches: ISalesOfBranch[];
  costsAnalyze: ICostsAnalyze;
}
