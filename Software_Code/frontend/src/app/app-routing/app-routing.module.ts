import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExperimentsListComponent} from '../components/experiments-list/experiments-list.component'
import {LoginFormComponent} from "../components/login-form/login-form.component";
import {CreateExperimentFormComponent} from "../components/create-experiment-form/create-experiment-form.component";
import {ExperimentComponent} from '../components/experiment/experiment.component';
import {CreateQuestionnaireComponent} from "../components/create-questionnaire/create-questionnaire.component";
import {QuestionnaireComponent} from '../components/questionnaire/questionnaire.component';
import {QuestionMultiComponent} from "../components/question-multi/question-multi.component";

const routes: Routes = [
  {path: 'experiments/:id', component: ExperimentComponent},
  {path: 'create-experiment', component: CreateExperimentFormComponent},
  {path: 'experiments', component: ExperimentsListComponent},
  {path: '', component: LoginFormComponent},
  {path: 'create-questionnaire', component: CreateQuestionnaireComponent},
  {path: 'questionnaire/:id', component: QuestionnaireComponent},
  {path: 'test', component: QuestionMultiComponent}
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
export class AppRoutingModule {
}
