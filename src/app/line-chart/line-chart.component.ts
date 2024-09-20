import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit{
  public chart: Chart;

  labels: String[] = [];
  datos: number[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // this.loadData();
    this.loadDataResumen(2024);
    // const data = {
    //   labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
    //   datasets: [
    //     {
    //       label: 'My First Dataset',
    //       data: [65, 59, 80, 81, 56, 55, 40],
    //       borderColor: 'rgb(75, 192, 192)',
    //       fill: false,
    //       tension: 0.1
    //     }
    //   ]
    // };

    setTimeout(() => {
      const data = {
        labels: this.labels,
        datasets: [
          {
            label: 'Predicciones realizadas',
            data: this.datos,
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
            tension: 0.1
          }
        ]
      };
  
      // const config = {
      //   type: 'line',
      //   data: {},
      //   options: {},
      //   plugins: []
      // };

      this.chart = new Chart("chart", {
        type: 'line' as ChartType,
        data: data,
        options: {
          responsive: false,
          maintainAspectRatio: true
        }
      });
    }, 1000);
    
  }

  loadData() {

    this.apiService.getPredictions().subscribe ( 
      (data) => {
        console.log(data);
      }, (error) => {
      console.log(error);
    });
  }

  loadDataResumen(year: number) {
    this.apiService.getQuantityPredictions(year).subscribe ( 
      (data) => {
        console.log(data[0]);
        
        let month = "";
        for(let i = 0; i < 12; i++) {

          switch(i) {
            case 0: month = "Enero"; break;
            case 1: month = "Febrero"; break;
            case 2: month = "Marzo"; break;
            case 3: month = "Abril"; break;
            case 4: month = "Mayo"; break;
            case 5: month = "Junio"; break;
            case 6: month = "Julio"; break;
            case 7: month = "Agosto"; break;
            case 8: month = "Setiembre"; break;
            case 9: month = "Octubre"; break;
            case 10: month = "Noviembre"; break;
            case 11: month = "Diciembre"; break;
          }
          this.labels.push(month);
          this.datos.push(data[i].quantity);
        }
        console.log(`Labels: ${this.labels}`);
        console.log(`Datos: ${this.datos}`);
      }, (error) => {
      console.log(error);
    });
  }  
}
