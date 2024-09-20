import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  datos: any;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadDataTable();
  }

  loadDataTable() {

    this.apiService.getPredictions().subscribe ( 
      (data) => {

        this.datos = data;
        // console.log();
      }, (error) => {
      console.log(error);
    });
  }
}
