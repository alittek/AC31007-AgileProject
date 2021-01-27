import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginDetails} from '../objects/login-details';
import {ExperimentDetails} from '../objects/experiment-details';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  BASE_URL = 'http://localhost:8080';
  LOGIN_PATH = '/login';
  CREATE_EXPERIMENT_PATH = '/create-experiment';
  EXPERIMENTS_PATH ='/experiments';

  constructor(private httpClient: HttpClient) {
  }

  login(loginDetails: LoginDetails): void {
    this.httpClient.post<string>(this.BASE_URL + this.LOGIN_PATH, loginDetails).subscribe(value => {
        localStorage.setItem('userId', value);
    });
  }

  getExperiments(){
    //guessing this for now
    return this.httpClient.get(this.BASE_URL + this.EXPERIMENTS_PATH);
  }

  createExperiment(experimentDetails: ExperimentDetails): void {
    this.httpClient.post<string>(this.BASE_URL + this.CREATE_EXPERIMENT_PATH, experimentDetails).subscribe(value => {
      console.log(value); // log inserted experiment id
    });
  }
}
