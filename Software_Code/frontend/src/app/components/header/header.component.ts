import {Component, OnInit} from '@angular/core';
import {StorageKeyConstants} from '../../utils/storage-key-constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.removeItem(StorageKeyConstants.USER_ID);
    localStorage.removeItem(StorageKeyConstants.USERNAME);
    localStorage.removeItem(StorageKeyConstants.LEVEL_OF_PRIVILEGES);
  }

}
