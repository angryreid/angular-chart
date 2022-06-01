export interface StockChart {
  stockDatetimeStamp: string;
  todayOpenPrice: string;
  todayHighPrice: string;
  todayLowPrice: string;
  todayClosePrice: string;
  todayVolume: string;
  todayTurnover: string;
}

export const Constants = {
  CHART_SELECTED: {
    DAY: 0,
    MONTH: 1,
  },
};
