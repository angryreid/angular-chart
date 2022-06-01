import { Component, ElementRef, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Constants, StockChart } from '../../model/type';
import { StockService } from '../../services/data/stock.service';
import { Chart } from 'chart.js';
import moment from 'moment';
import { StockRule } from '../../rule/stock.rule';
import { CommonService } from '../../services/env/common.service';
@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})
export class StockChartComponent implements OnInit {

  @ViewChild('canvasContainer', { read: ElementRef })
  private canvasContainer: ElementRef<HTMLDivElement>;
  private context = {
    timeUnit: 'hour',
    timeStepSize: 3,
    contextType: '2d',
    displayXline: true,
    minX: 0,
    maxX: 0,
    datasetsBorderColor: '#0f7d42',
    linerGradientStartColor: 'rgba(115, 125, 66, 0.1)',
  };
  private canvas: HTMLCanvasElement;
  private chart: Chart;
  private canvasId = 'stockCanvas';
  activeChartDetailList: StockChart[] = [];
  slectedType = Constants.CHART_SELECTED.DAY;

  constructor(
    private render: Renderer2,
    private stockService: StockService,
    private commonService: CommonService
  ) {}

  get market(): string {
    return this.commonService.getCurrentMarket();
  }

  ngOnInit(): void {
    this.stockService.getStockDayList().subscribe((list) => {
      this.activeChartDetailList = list;
      this.renderingChart();
    });
  }

  switchType(type: number) {
    switch(type) {
      case Constants.CHART_SELECTED.DAY:
        this.context.timeUnit = 'hour';
        this.context.timeStepSize = 3;
        break;
      case Constants.CHART_SELECTED.MONTH:
        this.context.timeUnit = 'day';
        this.context.timeStepSize = 7;
        break;
    }
    this.stockService.getStockList(type).subscribe(list => {
      this.activeChartDetailList = list;
      this.renderingChart();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes);
    this.renderingChart();
  }

  setChartConfig() {
    if (this.activeChartDetailList.length > 1) {
      // To set X min & max.
      const len = this.activeChartDetailList.length;
      const marketRule = StockRule.market[this.market];
      if (this.slectedType === Constants.CHART_SELECTED.DAY) {
        this.context.minX =
          moment
            .unix(Number(this.activeChartDetailList[0].stockDatetimeStamp))
            .add(marketRule?.marketDurtion, 'minute')
            .unix() * 1000;
      } else {
        this.context.minX =
          Number(this.activeChartDetailList[0].stockDatetimeStamp) * 1000;
      }
      this.context.maxX =
        Number(this.activeChartDetailList[len - 1].stockDatetimeStamp) * 1000;
      // To set chart theme based on positive or negetive closedPrice
      if (this.isChartPositive(this.activeChartDetailList)) {
        this.context.datasetsBorderColor = marketRule?.positiveColor;
        this.context.linerGradientStartColor =
          marketRule?.positiveGradientColor;
      } else {
        this.context.datasetsBorderColor = marketRule?.negativeColor;
        this.context.linerGradientStartColor =
          marketRule?.negativeGradientColor;
      }
    } else {
      this.context.displayXline = false;
    }
  }

  isChartPositive(list: StockChart[]): boolean {
    if (list.length <= 1) return false;
    return (
      Number(list[list.length - 1].todayClosePrice) >
      Number(list[0].todayClosePrice)
    );
  }

  updateChart() {
    this.chart.data.datasets[0].data = this.activeChartDetailList.map(
      (stock) => {
        const currentDay = moment
          .unix(Number(stock.stockDatetimeStamp))
          .format('MM/DD/YYYY');
        console.log(currentDay);
        return {
          x: Number(stock.stockDatetimeStamp) * 1000,
          y: Number(stock.todayOpenPrice),
        };
      }
    );
    this.chart.update();
  }

  renderingChart() {
    if (this.chart !== undefined) {
      this.chart.destroy();
    }

    if (this.canvas === undefined) {
      this.createCanvas();
    }
    this.setChartConfig();
    this.createChart();
    this.updateChart();
  }

  createCanvas() {
    if (this.canvasContainer?.nativeElement) {
      const canvas = this.render.createElement('canvas') as HTMLCanvasElement;
      this.render.setAttribute(canvas, 'id', this.canvasId);
      console.log(this.canvasContainer);
      this.render.appendChild(this.canvasContainer?.nativeElement, canvas);
      this.canvas = canvas;
    }
  }

  createChart() {
    if (!this.canvas) return;
    const canvasContext = this.canvas.getContext(
      this.context.contextType
    ) as CanvasRenderingContext2D;
    const gradient = canvasContext.createLinearGradient(0, 0, 0, 160);
    gradient.addColorStop(0, this.context.linerGradientStartColor);
    gradient.addColorStop(1, this.context.linerGradientStartColor);

    this.chart = new Chart(this.canvas, {
      type: 'line',
      intersect: false,
      data: {
        datasets: [
          {
            fill: 'start',
            lineTension: 0.2,
            backgroundColor: gradient,
            borderColor: this.context.datasetsBorderColor,
            borderWidth: 1,
            pointRadius: 0,
            hoverBackgroundColor: '',
            hoverBorderColor: 'transparent',
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        animation: {
          duration: 0,
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
          },
        },
        tooltips: {
          intersect: false,
          backgroundColor: 'black',
          borderColor: 'rgb(5, 109, 174)',
          borderWidth: 1,
          cornerRadius: 2,
          callback: {
            title: (tp) => {
              return tp[0].value;
            },
            label: (tp) => {
              return tp.label;
            },
          },
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              min: this.context.minX,
              max: this.context.maxX,
              display: true,
              time: {
                parser: 'yyyyMMdd',
                tooltipFormat: 'HH:mm',
                unit: this.context.timeUnit,
                stepSize: this.context.timeStepSize,
                displayFormats: {
                  hour: 'H a',
                  day: 'd MMM',
                },
              },
              gridLines: {
                display: false,
                drawBorder: true,
              },
              bounds: 'ticks',
              ticks: {
                fontSize: 10,
                fontColor: '#056DAE',
              },
            },
          ],
          yAxes: [
            {
              position: 'right',
              display: true,
            },
          ],
        },
      },
    });
  }

}
