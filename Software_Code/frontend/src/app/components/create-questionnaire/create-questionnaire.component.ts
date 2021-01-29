import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {QuestionnaireDetails} from '../../model/request/questionnaire-details';
import {QuestionDetails} from '../../model/request/question-details';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-create-questionnaire',
  templateUrl: './create-questionnaire.component.html',
  styleUrls: ['./create-questionnaire.component.css']
})
export class CreateQuestionnaireComponent {
  questionnaireData: QuestionnaireDetails;
  questionData: QuestionDetails;
  isCreated: boolean;
  creationStatusText: BehaviorSubject<string>;

  constructor(private httpService: HttpService) {
      this.questionnaireData = new QuestionnaireDetails();
      this.questionnaireData.userID = parseInt(localStorage.getItem('userId'), 10);
      this.isCreated = false;
      this.creationStatusText = new BehaviorSubject(null);
    }

  createQuestionnaire(): void {
    this.questionData.questionnaireID = this.questionnaireData.userID;
    this.httpService.createQuestionnaire(this.questionnaireData).subscribe(value => {
      this.isCreated = true;
      this.creationStatusText.next('Questionnaire created successfully');
    }, error => {
      this.isCreated = false;
      if (error.status === 0) {
        this.creationStatusText.next('Error connecting to the backend.');
      } else if (error.status === 400) {
        this.creationStatusText.next('Create Questionnaire details are missing');
      } else {
        this.creationStatusText.next('Unexpected error.');
      }
    });
  }

  createQuestion(): void {
    this.httpService.createQuestion(this.questionData).subscribe(value => {
      this.isCreated = true;
      this.creationStatusText.next('Question created successfully');
    }, error => {
      this.isCreated = false;
      if (error.status === 0) {
        this.creationStatusText.next('Error connecting to the backend.');
      } else if (error.status === 400) {
        this.creationStatusText.next('Create Question details are missing');
      } else {
        this.creationStatusText.next('Unexpected error.');
      }
    });
  }
}
