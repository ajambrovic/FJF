import { Component, OnInit } from '@angular/core';
import { LineChartService } from './line-chart.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 12, // minimum value
          max: 24, // maximum value
        }
      }]
    }
  };
  public isDataAvailable = false;
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];

  constructor(private service: LineChartService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.service.getTemperature().subscribe(data => {
      this.lineChartLabels = data.lineChartLabels;
      this.lineChartData = data.lineChartData;
      this.isDataAvailable = true;
    });
  }
}
