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
    type: 3,
    required: true,
    description: 'Description of question if we are including this.',
    answer: ['answer1', 'answer2', 'answer3'],
    systemUsabilityScale: 5
  };

  constructor() {}

  ngOnInit(): void {
  }

  //returning array of [0..] for making the scale front-end
  getScale() {
    let scale: number[] = [];
    for (let i = 0; i <= this.question.systemUsabilityScale; i++) {
      scale.push(i);
    }
    return scale;
  }


}
