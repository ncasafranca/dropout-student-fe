import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css'],
})
export class InsertComponent implements OnInit, AfterViewInit {
  modelo: tf.LayersModel;

  async loadModel() {
    console.log('Cargando modelo ...');
    this.modelo = await tf.loadLayersModel('/assets/tfjs/model.json');
    console.log('Modelo cargado');

    this.predecir();
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadModel();
    }, 1500);
  }

  predecir() {
    // let arreglo: any = [[
    //   [[1], [0], [0], [111], [2], [1], [0], [2], [1], [0], [0], [0], [0], [0], [0], [1], [3], [0], [0]]
    // ]];
    var arr = [[1,0,0,1,2,1,0,1,1,1,0,0,0,0,0,1,3,53.895,10.15]];

    var tensor = tf.tensor2d(arr);
    var resultado = (this.modelo.predict(tensor) as tf.Tensor).dataSync();

    console.log(...resultado);
  }
}
