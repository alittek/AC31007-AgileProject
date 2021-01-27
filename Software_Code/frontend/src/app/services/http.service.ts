import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../model/request/login-request';
import {ExperimentDetails} from '../model/request/experiment-details';
import {Observable} from 'rxjs';
import {UserView} from '../model/response/user-view';
import {ApiConstants} from '../utils/api-constants';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  login(loginDetails: LoginRequest): Observable<UserView> {
    return this.httpClient.post<UserView>(ApiConstants.LOGIN, loginDetails);
  }

  register(loginDetails: LoginRequest): Observable<any> {
    return this.httpClient.post(ApiConstants.REGISTER, loginDetails);
  }


  createExperiment(experimentDetails: ExperimentDetails): void {
    this.httpClient.post<string>(ApiConstants.CREATE_EXPERIMENT, experimentDetails).subscribe(value => {
      console.log(value); // log inserted experiment id
    });
  }
}
