import {Component, EventEmitter, Output} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {QuestionDetails} from '../../model/request/question-details';

@Component({
  selector: 'app-question-multi',
  templateUrl: './question-multi.component.html',
  styleUrls: ['./question-multi.component.css']
})
export class QuestionMultiComponent {
  data: QuestionDetails;
  @Output()
  chooseOptionsEvent = new EventEmitter<string[]>();

  // not sure if this constructor is needed as we're passing in QuestionDetails object
  constructor(private httpService: HttpService) {
    this.data = new QuestionDetails();
  }

  identity(index: number, item: any): any {
    return index;
  }

  chooseOptions(): void {
    this.chooseOptionsEvent.emit(this.data.answers);
  }
}
