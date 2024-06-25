import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PredictionComponent } from './prediction/prediction.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path : 'prediction', component: PredictionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
