import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import { QuestionDetails} from "../../model/request/question-details";
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-question-multi',
  templateUrl: './question-multi.component.html',
  styleUrls: ['./question-multi.component.css']
})
export class QuestionMultiComponent {
  data: QuestionDetails;

  constructor() {
    // pass data from backend in here?
  }

  addOptions(){
    // set options to backend here?
  }

}
