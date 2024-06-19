import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css'],
})
export class InsertComponent implements OnInit {
  modelo: tf.LayersModel;
  result: any = 0;
  msg: string;

  async loadModel() {
    console.log('Cargando modelo ...');
    this.modelo = await tf.loadLayersModel('/assets/tfjs/model.json');
    console.log('Modelo cargado');

    this.predecir();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadModel();
    }, 1500);
  }

  predecir() {
    var arr = [[1,1,1,1,1,22,8,5,1,0,1,0,1,20,5,13.800000,0,0,5,6,5,12.000000,0,-3.12]];

    var tensor = tf.tensor2d(arr, [1, 24]);
    var resultado = (this.modelo.predict(tensor) as tf.Tensor).dataSync();

    console.log(...resultado);

    this.result = resultado;

    this.msg = "No Churn";

    if (this.result) {
      this.msg = "Churn";
    }
  }
}
