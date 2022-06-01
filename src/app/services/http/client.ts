import { Observable } from 'rxjs';
import { RequestOptions } from './type';

export interface Client {
  setHeader(key: string, value: string): void;
  get(url: string, options?: RequestOptions): Observable<any>;
  post(url: string, requestData: any, options?: RequestOptions): Observable<any>;
}
