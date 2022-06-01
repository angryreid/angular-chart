import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { dayChartDetails } from '../../model/dayChartDetails';
import { monthChartDetails } from '../../model/monthChartDetails';
import { monthChartDetailsUS } from '../../model/monthChartDetailsUS';
import { StockChart } from '../../model/type';
import { RestClient } from '../http/restClient';

@Injectable()
export class StockService {
  constructor(private http: RestClient) {}

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
        return of(monthChartDetails);
      })
    );
  }

  public getStockMonthUSList(): Observable<StockChart[]> {
    return this.http.post(this.http.getRequestUrl('stockMonthUSList'), {}).pipe(
      map((_) => _ as StockChart[]),
      catchError((_err) => {
        // To handle err.
        return of(monthChartDetailsUS);
      })
    );
  }
}
