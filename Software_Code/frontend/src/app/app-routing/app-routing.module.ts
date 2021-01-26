import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperimentListComponent } from '../components/experiment-list/experiment-list.component'
import {LoginFormComponent} from "../components/login-form/login-form.component";
import {CreateExperimentFormComponent} from "../components/create-experiment-form/create-experiment-form.component";

const routes: Routes = [
  {path: 'experiments/create-experiment', component: CreateExperimentFormComponent},
  {path: 'experiments', component: ExperimentListComponent},
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
