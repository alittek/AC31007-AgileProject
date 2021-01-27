import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginDetails} from '../objects/login-details';
import {ExperimentDetails} from '../objects/experiment-details';
import {UserId} from '../objects/user-id';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  BASE_URL = 'http://localhost:8080';
  LOGIN_PATH = '/login';
  CREATE_EXPERIMENT_PATH = '/create-experiment';
  ALL_EXPERIMENTS_PATH = '/all-experiments';

  constructor(private httpClient: HttpClient) {
  }

  login(loginDetails: LoginDetails): void {
    this.httpClient.post<string>(this.BASE_URL + this.LOGIN_PATH, loginDetails).subscribe(value => {
      localStorage.setItem('userId', value);
    });
  }

  createExperiment(experimentDetails: ExperimentDetails): void {
    this.httpClient.post<string>(this.BASE_URL + this.CREATE_EXPERIMENT_PATH, experimentDetails).subscribe(value => {
      console.log(value); // log inserted experiment id
    });
  }

  getAllExperiments(): Observable<ExperimentDetails[]> {
    const userId = new UserId();
    userId.id = parseInt(localStorage.getItem('userId'), 10);
    this.httpClient.post<ExperimentDetails[]>(this.BASE_URL + this.ALL_EXPERIMENTS_PATH, userId)
      .subscribe(experiments => console.log(experiments));
    return this.httpClient.post<ExperimentDetails[]>(this.BASE_URL + this.ALL_EXPERIMENTS_PATH, userId);
  }
}
