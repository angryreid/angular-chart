import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  private market: 'hk' | 'us' = 'hk';
  constructor() {}

  getCurrentMarket(): string {
    return this.market;
    // return 'us';
  }

  switchMarket() {
    if (this.market === 'hk') {
      this.market = 'us';
    } else {
      this.market = 'hk';
    }
  }
}
