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
  question: QuestionDetails = {
    questionnaireID: 1,
    title: 'This is an example of a question title?',
    question: '',
    type: 'radio',
    optional: false,
    description: 'Description of question if we are including this.',
    answer: ['answer1', 'answer2', 'answer3'],
    systemUsabilityScale: 5,
  };

  constructor() {}

  ngOnInit(): void {
  }

}
