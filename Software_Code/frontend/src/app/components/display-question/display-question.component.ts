import { Component, OnInit } from '@angular/core';
import {QuestionDetails} from "../../model/request/question-details";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-display-question',
  templateUrl: './display-question.component.html',
  styleUrls: ['./display-question.component.css']
})
export class DisplayQuestionComponent implements OnInit {
  //placeholder data
  //question: QuestionDetails;
  question = ['This is an example of a question title?', 'checkbox', 'Description of question if we are including this.', 'option1', 'option2'];

  constructor() {}

  ngOnInit(): void {
    // this.question.title = 'This is an example of a question title?';
    // this.question.type = 'open';
    // this.question.description = 'Description of question if we are including this.';
    // this.question.optional = true;
    // this.question.answer = 'Possible answer';
  }

}
