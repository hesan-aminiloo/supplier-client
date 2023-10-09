interface DatesType {
  label: string;
  value: string;
}
export function getMonthsAndYearsBetweenDates() {
  const start = new Date('2023/1/1');
  const today = new Date();
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  let dates: DatesType[] = [];
  while (start < currentMonth) {
    const monthYear = start.toLocaleString('default', { month: 'long', year: 'numeric' });
    dates = [...dates, { label: monthYear, value: monthYear }];
    start.setMonth(start.getMonth() + 1);
  }
  return dates;
}
