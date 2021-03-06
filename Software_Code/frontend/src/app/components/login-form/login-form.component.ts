import {Component, OnInit} from '@angular/core';
import {LoginRequest} from '../../model/request/login-request';
import {HttpService} from '../../services/http.service';
import {StorageKeyConstants} from '../../utils/storage-key-constants';
import {BehaviorSubject} from 'rxjs';
import {faKey, faUser} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  faUsers = faUser;
  faKeys = faKey;
  data: LoginRequest;
  errorText: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private httpService: HttpService,
              private router: Router) {
    this.data = new LoginRequest();
  }

  ngOnInit(): void {
    if (!!localStorage.getItem(StorageKeyConstants.USER_ID)) {
      this.router.navigateByUrl('/experiments');
    }
  }

  login(): void {
    this.httpService.login(this.data).subscribe(user => {
      localStorage.setItem(StorageKeyConstants.USER_ID, user.id.toString());
      localStorage.setItem(StorageKeyConstants.USERNAME, user.username);
      localStorage.setItem(StorageKeyConstants.LEVEL_OF_PRIVILEGES, JSON.stringify(user.levelOfPrivileges));

      this.errorText.next(null);

      this.router.navigateByUrl('/experiments');
    }, error => {
      if (error.status === 0) {
        this.errorText.next('Error connecting to the backend.');
      } else if (error.status === 400) {
        this.errorText.next('User details are incorrect.');
      } else {
        this.errorText.next('Unexpected error.');
      }
    });
  }

}
