import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {LoginFormComponent} from './components/login-form/login-form.component';
import {ExperimentsListComponent} from './components/experiments-list/experiments-list.component';
import {CreateExperimentFormComponent} from './components/create-experiment-form/create-experiment-form.component';
import { ExperimentComponent } from './components/experiment/experiment.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    ExperimentsListComponent,
    CreateExperimentFormComponent,
    ExperimentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
