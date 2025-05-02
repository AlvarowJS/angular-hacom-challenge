import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chartOption: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getBooksYears().subscribe((data: any[]) => {
      console.log(data, "funciona?")
      const years = data.map(item => item.year);
      const totals = data.map(item => item.total);
      
      this.chartOption = {
        title: {
          text: 'Libros por año'
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: years
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Libros',
            type: 'bar',
            data: totals
          }
        ]
      };
    });
  }
}
