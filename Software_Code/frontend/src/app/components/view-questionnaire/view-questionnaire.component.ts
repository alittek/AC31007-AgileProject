import {Component, OnInit} from '@angular/core';
import {QuestionDetails} from '../../model/request/question-details';
import {QuestionnaireDetails} from '../../model/request/questionnaire-details';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-view-questionnaire',
  templateUrl: './view-questionnaire.component.html',
  styleUrls: ['./view-questionnaire.component.css']
})
export class ViewQuestionnaireComponent implements OnInit {
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
    this.getQuestions();
  }

  getQuestionnaireRouteId(): void {
    this.route.params.subscribe(params => this.questionnaireRouteId = params.id);
  }

  getQuestionnaire(): void {
    this.httpService.getQuestionnaire(this.questionnaireRouteId).subscribe(value => {
      this.questionnaire = value;
    });
  }

  getQuestions(): void {
    this.httpService.getQuestions(this.questionnaireRouteId).subscribe(value => {
      this.questions = value;
    });
  }
}
