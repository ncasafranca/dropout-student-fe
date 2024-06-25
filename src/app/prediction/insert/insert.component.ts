import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as tf from '@tensorflow/tfjs';
import { Prediction } from 'src/app/model/Prediction';
import { ApiService } from 'src/app/service/api.service';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css'],
})
export class InsertComponent implements OnInit {
  modelo: tf.LayersModel;
  result: any = 0;
  msg: string;
  enableButtonPredict: boolean = false;

  data: any = {};
  body: Prediction = {};
  tensor: number[][] = [];

  public formStudent = new FormGroup({
    datosEstudiante: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      maritalStatus: new FormControl(''),
      applicationMode: new FormControl(''),
      applicationOrder: new FormControl(''),
      daytimeAttendance: new FormControl(''),
      previousQualification: new FormControl(''),
      mothersQualification: new FormControl(''),
      mothersOccupation: new FormControl(''),
      fathersOccupation: new FormControl(''),
      displaced: new FormControl(''),
      debtor: new FormControl(''),
      tuition: new FormControl(''),
      gender: new FormControl(''),
      scholarshipHolder: new FormControl(''),
      ageAtEnrollment: new FormControl(''),
      curricularUnits1stSemEvaluations: new FormControl(''),
      curricularUnits1stSemGrade: new FormControl(''),
      curricularUnits1stSemWithoutEvaluations: new FormControl(''),
      curricularUnits2ndSemCredited: new FormControl(''),
      curricularUnits2ndSemEnrolled: new FormControl(''),
      curricularUnits2ndSemEvaluations: new FormControl(''),
      curricularUnits2ndSemApproved: new FormControl(''),
      curricularUnits2ndSemGrade: new FormControl(''),
      curricularUnits2ndWithoutEvaluations: new FormControl(''),
      gdp: new FormControl(''),
    })
  });

  constructor(private apiService: ApiService) { }

  async loadModel() {
    console.log('Cargando modelo ...');
    this.modelo = await tf.loadLayersModel('/assets/tfjs/model.json');
    console.log('Modelo cargado');

    this.enableButtonPredict = true;
    // this.predecir();
  }

  ngOnInit(): void {

    setTimeout(() => {
      this.loadModel();
    }, 1500);

    // const objetoJson = {
    //     "maritalStatus": 1,
    //     "applicationMode": 8,
    //     "applicationOrder": 5,
    //     "daytimeAttendance": 1,
    //     "previousQualification": 1,
    //     "mothersQualification": 13,
    //     "mothersOccupation": 6,
    //     "fathersOccupation": 10,
    //     "displaced": 1,
    //     "debtor": 0,
    //     "tuition": 1,
    //     "gender": 1,
    //     "scholarshipHolder": 0,
    //     "ageAtEnrollment": 20,
    //     "curricularUnits1stSemEvaluations": 0,
    //     "curricularUnits1stSemGrade": 0.000000,
    //     "curricularUnits1stSemWithoutEvaluations": 0,
    //     "curricularUnits2ndSemCredited": 0,
    //     "curricularUnits2ndSemEnrolled": 0,
    //     "curricularUnits2ndSemEvaluations": 0,
    //     "curricularUnits2ndSemApproved": 0,
    //     "curricularUnits2ndSemGrade": 0.0,
    //     "curricularUnits2ndWithoutEvaluations": 0,
    //     "gdp": 1.74
    // }

    // var arr = this.tensor;

    // var tensor = tf.tensor2d(arr, [1, 24]);
    // var resultado = (this.modelo.predict(tensor) as tf.Tensor).dataSync();

    // setTimeout(() => {
    //   this.predecir();
    // }, 2500);
  }

  predecir() {

    // this.getPredictRisk();

    this.fillData();

    // this.dataTest();

    console.log("body: ", this.body)
    this.apiService.prediction(this.body).subscribe ( 
      (data) => {
        swal.fire({
          position: 'top-end',
          text: "Predicción guardada",
          icon: "success",
          showConfirmButton: false,
          toast: true,
          timer: 1500
        }).then((result) => {
          // console.log(data);
        });
      }, (error) => {
      swal.fire({
        position: 'top-end',
        text: "Lo sentimos, se produjo un error inesperado en el proceso",
        icon: "error",
        showConfirmButton: false,
        toast: true,
        timer: 1500
      }).then((result) => {
        console.log(result);
      });
      console.log(error);
    });
  }

  fillData() {
    this.body.maritalStatus = Number(this.formStudent.controls['datosEstudiante'].controls['maritalStatus'].value);
    this.body.applicationMode =  Number(this.formStudent.controls['datosEstudiante'].controls['applicationMode'].value);
    this.body.applicationOrder = Number(this.formStudent.controls['datosEstudiante'].controls['applicationOrder'].value);
    this.body.daytimeAttendance = Number(this.formStudent.controls['datosEstudiante'].controls['daytimeAttendance'].value);
    this.body.previousQualification = Number(this.formStudent.controls['datosEstudiante'].controls['previousQualification'].value);
    this.body.mothersQualification = Number(this.formStudent.controls['datosEstudiante'].controls['mothersQualification'].value);
    this.body.mothersOccupation = Number(this.formStudent.controls['datosEstudiante'].controls['mothersOccupation'].value);
    this.body.fathersOccupation = Number(this.formStudent.controls['datosEstudiante'].controls['fathersOccupation'].value);
    this.body.displaced = Number(this.formStudent.controls['datosEstudiante'].controls['displaced'].value);
    this.body.debtor = Number(this.formStudent.controls['datosEstudiante'].controls['debtor'].value);
    this.body.tuition = Number(this.formStudent.controls['datosEstudiante'].controls['tuition'].value);
    this.body.gender = Number(this.formStudent.controls['datosEstudiante'].controls['gender'].value);
    this.body.scholarshipHolder = Number(this.formStudent.controls['datosEstudiante'].controls['scholarshipHolder'].value);
    this.body.ageAtEnrollment = Number(this.formStudent.controls['datosEstudiante'].controls['ageAtEnrollment'].value);
    this.body.curricularUnits1stSemEvaluations = Number(this.formStudent.controls['datosEstudiante'].controls['curricularUnits1stSemEvaluations'].value);
    this.body.curricularUnits1stSemGrade = Number(this.formStudent.controls['datosEstudiante'].controls['curricularUnits1stSemGrade'].value);
    this.body.curricularUnits1stSemWithoutEvaluations = Number(this.formStudent.controls['datosEstudiante'].controls['curricularUnits1stSemWithoutEvaluations'].value);
    this.body.curricularUnits2ndSemCredited = Number(this.formStudent.controls['datosEstudiante'].controls['curricularUnits2ndSemCredited'].value);
    this.body.curricularUnits2ndSemEnrolled = Number(this.formStudent.controls['datosEstudiante'].controls['curricularUnits2ndSemEnrolled'].value);
    this.body.curricularUnits2ndSemEvaluations = Number(this.formStudent.controls['datosEstudiante'].controls['curricularUnits2ndSemEvaluations'].value);
    this.body.curricularUnits2ndSemApproved = Number(this.formStudent.controls['datosEstudiante'].controls['curricularUnits2ndSemApproved'].value);
    this.body.curricularUnits2ndSemGrade = Number(this.formStudent.controls['datosEstudiante'].controls['curricularUnits2ndSemGrade'].value);
    this.body.curricularUnits2ndWithoutEvaluations = Number(this.formStudent.controls['datosEstudiante'].controls['curricularUnits2ndWithoutEvaluations'].value);
    this.body.gdp = Number(this.formStudent.controls['datosEstudiante'].controls['gdp'].value);

    this.body.predictRisk = this.getPredictRisk();
  }

  getPredictRisk(): number {
    this.tensor[0] = [];
    let contador = 0;
    Object.values(this.body).forEach( value => {
      contador++;
      if (contador <= 24) {
        this.tensor[0].push(value);
      }
    });

    var tensor = tf.tensor2d(this.tensor, [1, 24]);
    var resultado = (this.modelo.predict(tensor) as tf.Tensor).dataSync();

    var predictRisk = resultado[0];

    return predictRisk;
  }

  dataTest() {

    this.body.maritalStatus = 1;
    this.body.applicationMode =  8;
    this.body.applicationOrder = 5;
    this.body.daytimeAttendance = 1;
    this.body.previousQualification = 1;
    this.body.mothersQualification = 13;
    this.body.mothersOccupation = 6;
    this.body.fathersOccupation = 10;
    this.body.displaced = 1;
    this.body.debtor = 0;
    this.body.tuition = 1;
    this.body.gender = 1;
    this.body.scholarshipHolder = 0;
    this.body.ageAtEnrollment = 20;
    this.body.curricularUnits1stSemEvaluations = 0;
    this.body.curricularUnits1stSemGrade = 0.000000;
    this.body.curricularUnits1stSemWithoutEvaluations = 0;
    this.body.curricularUnits2ndSemCredited = 0;
    this.body.curricularUnits2ndSemEnrolled = 0;
    this.body.curricularUnits2ndSemEvaluations = 0;
    this.body.curricularUnits2ndSemApproved = 0;
    this.body.curricularUnits2ndSemGrade = 0.0;
    this.body.curricularUnits2ndWithoutEvaluations = 0,
    this.body.gdp = 1.74;
  }
}
