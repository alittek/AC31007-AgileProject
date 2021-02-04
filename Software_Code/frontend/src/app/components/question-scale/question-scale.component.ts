import { Component } from '@angular/core';
import {HttpService} from '../../services/http.service';
import {QuestionDetails} from "../../model/request/question-details";

@Component({
  selector: 'app-question-scale',
  templateUrl: './question-scale.component.html',
  styleUrls: ['./question-scale.component.css'],
})
export class QuestionScaleComponent {
  data: QuestionDetails;

  constructor() {
    // not sure if this constructor is needed as we're passing in QuestionDetails object
  }

  addScaleOptions(): void {
    // set systemUsabilityScale in object here
  }

}
