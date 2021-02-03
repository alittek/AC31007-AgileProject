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
