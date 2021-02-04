import {Component, OnInit} from '@angular/core';
import {QuestionDetails} from '../../model/request/question-details';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../services/http.service';
import {QuestionnaireDetails} from '../../model/request/questionnaire-details';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  questionnaireRouteId: number;
  questions: QuestionDetails[];
  questionnaire: QuestionnaireDetails;

  constructor(private route: ActivatedRoute,
              private httpService: HttpService) {
    this.questions = new Array<QuestionDetails>();
  }

  ngOnInit(): void {
    this.getQuestionnaireRouteId();
    this.getQuestionnaire();
  }

  getQuestionnaireRouteId(): void {
    this.route.params.subscribe(params => this.questionnaireRouteId = params.id);
  }

  getQuestionnaire(): void {
    this.httpService.getQuestionnaire(this.questionnaireRouteId).subscribe(value => {
      this.questionnaire = value;
    });
  }
}
