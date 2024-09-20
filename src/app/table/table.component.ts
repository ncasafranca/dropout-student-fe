import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  datos: any;
  ts: any;
  codigo: any;
  filter: boolean = false;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadDataTable();

    console.log(this.filter);
  }

  filterRows() {
    this.codigo = (<HTMLInputElement>document.getElementById("code"))!.value;

    if (this.codigo === "") {
      this.filter = false;
    } else {
      this.filter = true;
    }
  }

  loadDataTable() {

    this.apiService.getPredictions().subscribe ( 
      (data) => {
        for( let i = 0; i < data.length; i++){ //Preprocesar los campos para la visualizacion
          let date = new Date(data[i].ts * 1000);
          data[i].ts = date.toLocaleString();
          data[i].predictRisk = Number(data[i].predictRisk.toFixed(2))*100;
        }

        this.datos = data;

      }, (error) => {
      console.log(error);
    });
  }
}
