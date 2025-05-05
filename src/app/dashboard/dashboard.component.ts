import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  barChartOption: any;
  publishedChartOption: any;
  genderChartOption: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {

    // Gráfico de libros por año (barras)
    this.dashboardService.getBooksYears().subscribe((data: any[]) => {
      const years = data.map(item => item.year);
      const totals = data.map(item => item.total);
      
      this.barChartOption = {
        title: { text: 'Libros por año' },
        tooltip: {},
        xAxis: { type: 'category', data: years },
        yAxis: { type: 'value' },
        series: [
          {
            name: 'Libros',
            type: 'bar',
            data: totals
          }
        ]
      };
    });

    // Gráfico de publicados vs no publicados (torta)
    this.dashboardService.getPublishedCount().subscribe((data: any) => {
      this.publishedChartOption = {
        title: { text: 'Libros Publicados', left: 'center' },
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 'left' },
        series: [
          {
            name: 'Estado',
            type: 'pie',
            radius: '50%',
            data: [
              { value: data.published, name: 'Publicados' },
              { value: data.unpublished, name: 'No Publicados' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    });

    // Gráfico de autores masculino vs femenino (torta)
    this.dashboardService.getGenderCount().subscribe((data: any) => {
      this.genderChartOption = {
        title: { text: 'Autores por Género', left: 'center' },
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', left: 'left' },
        series: [
          {
            name: 'Género',
            type: 'pie',
            radius: '50%',
            data: [
              { value: data.masculino, name: 'Masculino' },
              { value: data.femenino, name: 'Femenino' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    });
  }
}
