import {Component, Input, OnInit} from '@angular/core';
import {QuestionnaireDetails} from '../../model/request/questionnaire-details';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-display-finished-questionnaire',
  templateUrl: './display-finished-questionnaire.component.html',
  styleUrls: ['./display-finished-questionnaire.component.css']
})
export class DisplayFinishedQuestionnaireComponent implements OnInit {
  questionnaire: QuestionnaireDetails;
  @Input() questionnaireId: number;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getQuestionnaire();
  }

  getQuestionnaire(): void {
    this.httpService.getQuestionnaire(this.questionnaireId).subscribe(value => {
      this.questionnaire = value;
    });
  }

}
