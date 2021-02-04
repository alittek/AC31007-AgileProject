import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {QuestionDetails} from '../../model/request/question-details';
import {HttpService} from '../../services/http.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  @Input()
  questionnaireId: number;
  data: QuestionDetails;
  isCreated: boolean;
  creationStatusText: BehaviorSubject<string>;
  @Output()
  questionCreatedEvent = new EventEmitter();

  constructor(private httpService: HttpService) {
    this.data = new QuestionDetails();
    this.isCreated = false;
    this.creationStatusText = new BehaviorSubject(null);
  }

  ngOnInit(): void {
    this.data.questionnaireId = this.questionnaireId;
  }

  createQuestion(): void {
    this.httpService.createQuestion(this.data).subscribe(value => {
      this.isCreated = true;
      this.creationStatusText.next('Question created successfully');
      this.questionCreatedEvent.emit();
      this.data = new QuestionDetails();
    }, error => {
      this.isCreated = false;
      if (error.status === 0) {
        this.creationStatusText.next('Error connecting to the backend.');
      } else if (error.status === 400) {
        this.creationStatusText.next('Create question details are missing');
      } else {
        this.creationStatusText.next('Unexpected error.');
      }
    });
  }
}
