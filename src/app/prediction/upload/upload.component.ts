import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as tf from '@tensorflow/tfjs';
import { Prediction } from 'src/app/model/Prediction';
import { PredictionBulk } from 'src/app/model/PredictionBulk';
import { ApiService } from 'src/app/service/api.service';
import  swal  from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  // Modelo
  modelo: tf.LayersModel;
  result: any = 0;
  msg: string;
  enableButtonPredict: boolean = false;

  data: any = {};
  body: Prediction = {};
  tensor: number[][] = [];

  tensorBulk: number[][] = [];

  //
  excelData: any;
  jsonData: any;

  statusUpload: any;
  enableButtonPredecir: boolean = false;

  headers: string[] = [];
  rows: any[] = [];

  constructor(private apiService: ApiService) { }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    
    if (target.files.length !== 1)
      throw new Error('No se puede usar múltiples archivos');
    
    const reader: FileReader = new FileReader();
    
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      
      const headers = data[0] as string[];
      const rows = data.slice(1);
      
      this.jsonData = rows.map((row: any) => {
        const rowData: { [key: string]: any } = {};
          
        headers.forEach((header, index) => {
          rowData[header] = row[index]; 
        });
      
        return rowData; 
      });
      console.log(this.jsonData);
    }; 
    
    if ( target.files[0]){
      this.statusUpload = "Archivo cargado correctamente";
      this.enableButtonPredecir = true;
    }

    reader.readAsBinaryString(target.files[0]);

  }

  predecirArchivo() {
    let dataPredictions: Prediction[] = [];
    
    this.jsonData.forEach((data: Prediction) => {
      let prediction: Prediction = {};
      this.tensorBulk[0] = [];
      let contador = 0;

      Object.values(data).forEach( value => {
        contador++;
        if (contador >= 4 && contador <= 26) {
          this.tensorBulk[0].push(value);
        }
      });

      var tensor = tf.tensor2d(this.tensorBulk, [1, 23]);
      var resultado = (this.modelo.predict(tensor) as tf.Tensor).dataSync();

      var predictRisk = resultado[0];

      prediction.codeStudent = data.codeStudent;
      prediction.firstName = data.firstName;
      prediction.lastName = data.lastName;
      prediction.maritalStatus = data.maritalStatus;
      prediction.applicationMode = data.applicationMode;
      prediction.applicationOrder = data.applicationOrder;
      prediction.daytimeAttendance = data.daytimeAttendance
      prediction.previousQualification = data.previousQualification;
      prediction.mothersQualification = data.mothersOccupation;
      prediction.mothersOccupation = data.mothersOccupation;
      prediction.fathersOccupation = data.fathersOccupation;
      prediction.displaced = data.displaced;
      prediction.debtor = data.debtor;
      prediction.tuition = data.tuition;
      prediction.gender = data.gender;
      prediction.scholarshipHolder = data.scholarshipHolder;
      prediction.ageAtEnrollment = data.ageAtEnrollment;
      prediction.curricularUnits1stSemEvaluations = data.curricularUnits1stSemEvaluations;
      prediction.curricularUnits1stSemGrade = data.curricularUnits1stSemGrade;
      prediction.curricularUnits1stSemWithoutEvaluations = data.curricularUnits1stSemWithoutEvaluations;
      prediction.curricularUnits2ndSemCredited = data.curricularUnits2ndSemCredited;
      prediction.curricularUnits2ndSemEnrolled = data.curricularUnits2ndSemEnrolled;
      prediction.curricularUnits2ndSemEvaluations = data.curricularUnits2ndSemEvaluations;
      prediction.curricularUnits2ndSemApproved = data.curricularUnits2ndSemApproved;
      prediction.curricularUnits2ndSemGrade = data.curricularUnits2ndSemGrade
      prediction.curricularUnits2ndWithoutEvaluations = data.curricularUnits2ndWithoutEvaluations;
      prediction.predictRisk = predictRisk;
  
      dataPredictions.push(prediction);
    });

    let predictionBulk: PredictionBulk = {};
    predictionBulk.data = dataPredictions;

    console.log(predictionBulk);
    this.apiService.predictionBulk(predictionBulk).subscribe ( 
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
          // console.log(data.predictRisk);
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

  getPredictRisk(): number {
    this.tensor[0] = [];
    let contador = 0;
    Object.values(this.body).forEach( value => {
      contador++;
      if (contador >= 4 && contador <= 26) {
        // console.log(`contador = ${contador} => ${value}`)
        this.tensor[0].push(value);
      }
    });

    var tensor = tf.tensor2d(this.tensor, [1, 23]);
    var resultado = (this.modelo.predict(tensor) as tf.Tensor).dataSync();

    var predictRisk = resultado[0];

    return predictRisk;
  }

  async loadModel() {
    console.log('Cargando modelo ...');
    this.modelo = await tf.loadLayersModel('/assets/tfjs/model.json');
    console.log('Modelo cargado');

  }

  ngOnInit(): void {

    setTimeout(() => {
      this.loadModel();
    }, 1500);
  }
  
}
