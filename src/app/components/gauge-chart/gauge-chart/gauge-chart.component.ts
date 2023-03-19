import { Component, ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import 'chartjs-gauge'

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss']
})
export class GaugeChartComponent implements OnInit, OnChanges {
  private canvas: HTMLCanvasElement;
  private canvasId = 'stockCanvas';
  @ViewChild('canvasContainer', { read: ElementRef }) private canvasContainer: ElementRef<HTMLDivElement>;
  constructor(private render: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.renderingChart();
  }


  renderingChart() {
    const canvas = this.render.createElement('canvas') as HTMLCanvasElement;
      this.render.setAttribute(canvas, 'id', this.canvasId);
      this.render.addClass(canvas, 'stock-chart');
      console.log(this.canvasContainer);
      this.render.appendChild(this.canvasContainer?.nativeElement, canvas);
      this.canvas = canvas;

    var ctx = this.canvas.getContext("2d");

    var chart = new Chart(ctx, {
      type: 'gauge',
      data: {
        datasets: [{
          value: 0.5,
          minValue: 0,
          data: [1, 2, 3, 4],
          backgroundColor: ['green', 'yellow', 'orange', 'red'],
        }]
      },
      options: {
        needle: {
          radiusPercentage: 2,
          widthPercentage: 3.2,
          lengthPercentage: 80,
          color: 'rgba(0, 0, 0, 1)'
        },
        valueLabel: {
          display: true,
          formatter: (value) => {
            return '$' + Math.round(value);
          },
          color: 'rgba(255, 255, 255, 1)',
          backgroundColor: 'rgba(0, 0, 0, 1)',
          borderRadius: 5,
          padding: {
            top: 10,
            bottom: 10
          }
        }
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.renderingChart();
    }, 300);
    
  }

}
