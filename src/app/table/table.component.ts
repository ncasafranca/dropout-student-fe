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
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadDataTable();
    let date = new Date(1720054956 * 1000);
    console.log(date.toLocaleString());
  }

  loadDataTable() {

    this.apiService.getPredictions().subscribe ( 
      (data) => {

        // this.datos = data;
        // console.log(data);

        for( let i = 0; i < data.length; i++){

          console.log(data[i].ts);

          let date = new Date(data[i].ts * 1000);
          data[i].ts = date.toLocaleString();

        }

        this.datos = data;

        // console.log(data.length);
      }, (error) => {
      console.log(error);
    });
  }
}
