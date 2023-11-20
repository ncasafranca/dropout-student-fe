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

    // this.predecir();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadModel();
    }, 1500);
  }

  predecir() {
    // let arreglo: any = [[
    //   [[1], [0], [0], [111], [2], [1], [0], [2], [1], [0], [0], [0], [0], [0], [0], [1], [3], [0], [0]]
    // ]];
    var arr = [[1,1,1,1,1,1,0,4,1,1,2,0,0,0,0,1,3,74.40,306.60]];

    var tensor = tf.tensor2d(arr);
    var resultado = (this.modelo.predict(tensor) as tf.Tensor).dataSync();

    console.log(...resultado);

    this.result = resultado;

    this.msg = "No Churn";

    if (this.result) {
      this.msg = "Churn";
    }
  }
}
