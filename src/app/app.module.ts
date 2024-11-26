import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PredictionComponent } from './prediction/prediction.component';
import { InsertComponent } from './prediction/insert/insert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LineChartComponent } from './line-chart/line-chart.component';
import { TableComponent } from './table/table.component';
import { ModalComponent } from './modal/modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './prediction/menu/menu.component';
import { UploadComponent } from './prediction/upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PredictionComponent,
    InsertComponent,
    LineChartComponent,
    TableComponent,
    ModalComponent,
    NavbarComponent,
    MenuComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
