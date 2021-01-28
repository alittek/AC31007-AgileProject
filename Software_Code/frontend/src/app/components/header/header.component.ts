import {Component, OnInit} from '@angular/core';
import {StorageKeyConstants} from '../../utils/storage-key-constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(StorageKeyConstants.USER_ID);
  }

  logout(): void {
    localStorage.removeItem(StorageKeyConstants.USER_ID);
    localStorage.removeItem(StorageKeyConstants.USERNAME);
    localStorage.removeItem(StorageKeyConstants.LEVEL_OF_PRIVILEGES);

    this.router.navigateByUrl('/');
  }

}
