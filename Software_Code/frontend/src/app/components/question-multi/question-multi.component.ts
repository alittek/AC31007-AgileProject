import {Component} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {QuestionDetails} from "../../model/request/question-details";

@Component({
  selector: 'app-question-multi',
  templateUrl: './question-multi.component.html',
  styleUrls: ['./question-multi.component.css']
})
export class QuestionMultiComponent {
  data: QuestionDetails;

  // not sure if this constructor is needed as we're passing in QuestionDetails object
  constructor(private httpService: HttpService) {
    this.data = new QuestionDetails();
  }

  addMultiOptions(): void {
    // set answers[] in object here
  }
}
