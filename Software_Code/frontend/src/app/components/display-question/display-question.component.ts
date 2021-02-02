import { Component, OnInit } from '@angular/core';
import {QuestionDetails} from "../../model/request/question-details";

@Component({
  selector: 'app-display-question',
  templateUrl: './display-question.component.html',
  styleUrls: ['./display-question.component.css']
})
export class DisplayQuestionComponent implements OnInit {
  //placeholder data
  question: QuestionDetails;
  question2 = ['This is an example of a question title?', 'multi', 'Description of question if we are including this.', 'radio', 'option1', 'option2'];

  constructor() {


  }

  ngOnInit(): void {
    this.question.title = 'This is an example of a question title?';
    this.question.type = 'multi';
    this.question.description = 'Description of question if we are including this.';
    this.question.optional = true;
    this.question.answer = 'Possible answer';
  }

}
