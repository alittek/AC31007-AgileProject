import {Component} from '@angular/core';
import {LoginDetails} from '../objects/login-details';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  data: LoginDetails;

  constructor(private httpService: HttpService) {
    this.data = new LoginDetails();
  }

  login(): void {
    this.httpService.login(this.data);
  }

}
