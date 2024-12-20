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
  year: number;
  yearDefault: number = 2024;
  years: number[] = [ 2024, 2023, 2022, 2021, 2020 ]
  labels: String[] = [];
  datos: number[] = [];
  datosRisk: number[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // this.loadData();
    this.loadDataResumen(this.yearDefault);
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
      this.renderChart();
    }, 1000);
    
  }

  renderChart() {
    const data = {
      labels: this.labels,
      datasets: [
        {
          label: 'Cantidad',
          data: this.datos,
          borderColor: 'rgb(75, 192, 192)',
          fill: false,
          tension: 0.1
        }, 
        {
          label: 'Riesgo',
          data: this.datosRisk,
          borderColor: 'rgb(254, 0, 0)',
          fill: false,
          tension: 0.1
        }
      ]
    };

    this.chart = new Chart("chart", {
      type: 'line' as ChartType,
      data: data,
      options: {
        responsive: false,
        maintainAspectRatio: true,
        plugins: {
          title: {
              display: true,
              text: 'Predicciones',
              padding: {
                  top: 10,
                  bottom: 30
              }
          }
      }
      }
    });
  }

  loadData() {

    this.apiService.getPredictions().subscribe ( 
      (data) => {
        // console.log(data);
      }, (error) => {
      console.log(error);
    });
  }

  loadDataResumen(year: number) {
    this.apiService.getQuantityPredictions(year).subscribe ( 
      (data) => {
        // console.log(data[0]);
        
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
          this.datosRisk.push(data[i].quantityRisk);
        }
      }, (error) => {
      console.log(error);
    });
  }

  loadResumenByYear() {

    this.year = Number((<HTMLSelectElement>document.getElementById("year"))!.value);

    this.labels = [];
    this.datos = [];
    this.datosRisk = [];

    this.loadDataResumen(this.year);

    setTimeout(() => {
      this.updateChart();
    }, 500);
    
  }

  updateChart() {
    this.chart.data.datasets[0].data = this.datos;
    this.chart.data.datasets[1].data = this.datosRisk;
    this.chart.data.labels = this.labels;
    this.chart.update();
  };
}
