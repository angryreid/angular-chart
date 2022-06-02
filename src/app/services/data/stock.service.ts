import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { dayChartDetails } from '../../model/dayChartDetails';
import { monthChartDetails } from '../../model/monthChartDetails';
import { monthChartDetailsUS } from '../../model/monthChartDetailsUS';
import { Constants, StockChart } from '../../model/type';
import { CommonService } from '../env/common.service';
import { RestClient } from '../http/rest-client';

@Injectable()
export class StockService {
  constructor(private http: RestClient, private commonService: CommonService) {}

  get market(): string {
    return this.commonService.getCurrentMarket();
  }

  public getStockList(type: number): Observable<StockChart[]> {
    switch (type) {
      case Constants.CHART_SELECTED.DAY:
        return this.getStockDayList();
      case Constants.CHART_SELECTED.MONTH:
        return this.getStockMonthyList();
    }
    return of([]);
  }

  public getStockDayList(): Observable<StockChart[]> {
    return this.http.post(this.http.getRequestUrl('stockDayList'), {}).pipe(
      map((_) => _ as StockChart[]),
      catchError((_err) => {
        // To handle err.
        return of(dayChartDetails);
      })
    );
  }

  public getStockMonthyList(): Observable<StockChart[]> {
    return this.http.post(this.http.getRequestUrl('stockMonthyList'), {}).pipe(
      map((_) => _ as StockChart[]),
      catchError((_err) => {
        // To handle err.
        switch (this.market) {
          case 'hk':
            return of(monthChartDetails);
          case 'us':
            return of(monthChartDetailsUS);
          default:
            return of([]);
        }
      })
    );
  }
}
