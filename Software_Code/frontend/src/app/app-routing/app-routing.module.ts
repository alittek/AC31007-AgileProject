import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperimentsListComponent } from '../components/experiments-list/experiments-list.component'
import {LoginFormComponent} from "../components/login-form/login-form.component";
import {CreateExperimentFormComponent} from "../components/create-experiment-form/create-experiment-form.component";
import {ExperimentComponent} from "../components/experiment/experiment.component";

const routes: Routes = [
  //using 1 for now
  {path: 'experiments/1', component: ExperimentComponent},
  {path: 'experiments/create-experiment', component: CreateExperimentFormComponent},
  {path: 'experiments', component: ExperimentsListComponent},
  {path: '', component: LoginFormComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
