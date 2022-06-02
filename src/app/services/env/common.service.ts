import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  constructor() {}

  getCurrentMarket(): string {
    // return 'hk';
    return 'us';
  }
}
