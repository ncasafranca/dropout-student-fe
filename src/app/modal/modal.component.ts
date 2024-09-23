import { Component, Input } from '@angular/core';
import $ from 'jquery';
import { Prediction } from '../model/Prediction';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {
  @Input() detalle : any | null;

  mostrarDetalle(fila: any): void { 
    this.detalle = fila;
  }
}
