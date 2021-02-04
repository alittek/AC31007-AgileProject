import { Component, Input } from '@angular/core';
import {HttpService} from '../../services/http.service';
import { QuestionDetails} from "../../model/request/question-details";

@Component({
  selector: 'app-question-multi',
  templateUrl: './question-multi.component.html',
  styleUrls: ['./question-multi.component.css']
})
export class QuestionMultiComponent {
  data: QuestionDetails;

  constructor(private httpService: HttpService) {
    this.data = new QuestionDetails();
  }

  addMultiOptions(){
    // set options to backend here?
  }

}