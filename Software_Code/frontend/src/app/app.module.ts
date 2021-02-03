import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {ExperimentsListComponent} from './components/experiments-list/experiments-list.component';
import {CreateExperimentFormComponent} from './components/create-experiment-form/create-experiment-form.component';
import {HeaderComponent} from './components/header/header.component';
import {ExperimentComponent} from './components/experiment/experiment.component';
import {EthicalTickboxComponent} from './components/ethical-tickbox/ethical-tickbox.component';
import {CreateQuestionnaireComponent} from './components/create-questionnaire/create-questionnaire.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {QuestionnaireComponent} from './components/questionnaire/questionnaire.component';
import { DisplayQuestionComponent } from './components/display-question/display-question.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { QuestionMultiComponent } from './question-multi/question-multi.component';
import { QuestionScaleComponent } from './components/question-scale/question-scale.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    ExperimentsListComponent,
    CreateExperimentFormComponent,
    HeaderComponent,
    ExperimentComponent,
    EthicalTickboxComponent,
    CreateQuestionnaireComponent,
    QuestionnaireComponent,
    DisplayQuestionComponent,
    AddQuestionComponent,
    QuestionMultiComponent,
    QuestionScaleComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
