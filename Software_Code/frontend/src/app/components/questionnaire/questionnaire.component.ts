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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  getQuestionnaireRouteId(): void {
    this.route.params.subscribe(params => this.questionnaireRouteId = params.id);
  }

}
