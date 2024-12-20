import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prediction } from 'src/app/model/Prediction';
import { PredictionBulk } from '../model/PredictionBulk';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi = "https://dropout-student-api.azurewebsites.net/api/v1/prediction";
  // private urlApi = "http://localhost:8080/api/v1/prediction";
  constructor(private http: HttpClient) { }

  public prediction(prediction: Prediction): Observable<any> {
    return this.http.post<any>(this.urlApi, prediction);
  }

  public predictionBulk(prediction: PredictionBulk): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/bulk`, prediction);
  }

  public getPredictions(): Observable<any> {
    return this.http.get<any>(this.urlApi);
  }

  public getQuantityPredictions(year: number): Observable<any> {
    let urlApi = `${this.urlApi}/count/${year}`
    return this.http.get<any>(urlApi);
  }
}
