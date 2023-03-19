import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RestClient } from './services/http/rest-client';
import { StockService } from './services/data/stock.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CommonService } from './services/env/common.service';
import { StockChartComponent } from './components/stock-chart/stock-chart.component';
import { GaugeChartModule } from 'angular-gauge-chart';

@NgModule({
  imports: [BrowserModule, CommonModule, HttpClientModule, GaugeChartModule],
  declarations: [AppComponent, StockChartComponent],
  bootstrap: [AppComponent],
  providers: [RestClient, StockService, CommonService],
})
export class AppModule {}
