import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './client';
import { RequestOptions } from './type';

@Injectable()
export class RestClient implements Client {

  public headers = {};

  constructor(private http: HttpClient) {}

  getRequestUrl(url: string): string {
    return `DUMMY_API_URL_${url}`
  }

  setHeader(key: string, value: string): void {
    // throw new Error('Method not implemented.');
    this.headers[key] = value;
  }

  get(url: string, options?: RequestOptions): Observable<any> {
    throw new Error('Method not implemented.');
  }

  post(
    url: string,
    requestData: any,
    options?: RequestOptions
  ): Observable<any> {
    // throw new Error('Method not implemented.');
    return this.http.post(url, requestData, {});
    // To add global time out
    // To add header handling
    // To add url generated function
    // To add requestData generated function
  }
}
