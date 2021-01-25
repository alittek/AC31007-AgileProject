import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginDetails} from '../objects/login-details';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  BASE_URL = 'http://localhost:8080';
  LOGIN_PATH = '/login';

  constructor(private httpClient: HttpClient) {
  }

  login(loginDetails: LoginDetails): void {
    this.httpClient.post<string>(this.BASE_URL + this.LOGIN_PATH, loginDetails).subscribe(value => {
        localStorage.setItem('userId', value);
    });
  }
}
