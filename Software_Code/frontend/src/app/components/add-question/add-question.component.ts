import { Component, OnInit } from '@angular/core';
import {QuestionDetails} from '../../model/request/question-details';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  data: QuestionDetails;

  constructor(private httpService: HttpService) {
    this.data = new QuestionDetails();
  }

  ngOnInit(): void {
  }

  createQuestion(): void {
    this.httpService.createQuestion(this.data).subscribe(value => console.log(value));
  }
}
