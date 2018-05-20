import { Component, OnInit } from '@angular/core';
import { LineChartService } from './line-chart.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  public lineChartType = 'line';
  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;
  public numberOfDays = 30;
  public lineChartOptions: any = {
    responsive: true,
    legend: {
      position: 'top',
    },
    scales: {
      yAxes: [{
        // scale label
        scaleLabel: {
          // display property
          display: true,
          // actual label
          labelString: 'Temperatura',
          fontSize: 30,
        },
        ticks: {
          min: 10, // minimum value
          max: 30, // maximum value
        }
      }],
      xAxes: [{
        // scale label
        scaleLabel: {
          // display property
          display: true,

          // actual label
          labelString: 'Doba dana',
          fontSize: 30,
        },
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
  public selectValues = [
    { value: 20, name: '20' },
    { value: 30, name: '30' },
    { value: 40, name: '40' }
  ];

  constructor(private service: LineChartService, private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.service.getTemperature(this.numberOfDays).subscribe(data => {
      this.lineChartLabels = data.lineChartLabels;
      this.lineChartData = data.lineChartData;
      this.isDataAvailable = true;
    });
  }

  public onChange(newNumberOfDays) {
    this.numberOfDays = newNumberOfDays;
    this.service.getTemperature(this.numberOfDays).subscribe(data => {
      this.lineChartData = [];
      this.lineChartLabels = [];
      data.lineChartData.forEach(dataElement => {
        this.lineChartData.push(dataElement);
      });
      data.lineChartLabels.forEach(dataElement => {
        this.lineChartLabels.push(dataElement);
      });
    });
  }
}
