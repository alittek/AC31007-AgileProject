import { Component, OnInit } from '@angular/core';
import {QuestionDetails} from '../../model/request/question-details';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  questionnaireRouteId: number;
  questions: QuestionDetails[];

  //testing seeing questions
  question1: QuestionDetails = {
    questionnaireID: 1,
    title: 'This is an example of a question title?',
    question: '',
    type: 3,
    required: true,
    description: 'Description of question if we are including this.',
    answers: ['answer1', 'answer2', 'answer3'],
    systemUsabilityScale: 5
  };
  question2: QuestionDetails = {
    questionnaireID: 2,
    title: 'This is an example of a question title?',
    question: '',
    type: 2,
    required: true,
    description: 'Description of question if we are including this.',
    answers: ['answer1', 'answer2', 'answer3'],
    systemUsabilityScale: 5
  };
  question3: QuestionDetails = {
    questionnaireID: 3,
    title: 'This is an example of a question title?',
    question: '',
    type: 0,
    required: true,
    description: 'Description of question if we are including this.',
    answers: ['answer1', 'answer2', 'answer3'],
    systemUsabilityScale: 5
  };
  testQuestions: QuestionDetails[] = [this.question1, this.question2, this.question3];



  constructor(private route: ActivatedRoute) {
    this.questions = new Array<QuestionDetails>();
  }

  ngOnInit(): void {
    this.getQuestionnaireRouteId();
  }

  getQuestionnaireRouteId(): void {
    this.route.params.subscribe(params => this.questionnaireRouteId = params.id);
  }

}
