import {Component, EventEmitter, Output} from '@angular/core';
import {QuestionDetails} from '../../model/request/question-details';

@Component({
  selector: 'app-question-scale',
  templateUrl: './question-scale.component.html',
  styleUrls: ['./question-scale.component.css'],
})
export class QuestionScaleComponent {
  data: QuestionDetails;
  @Output()
  chooseScaleEvent = new EventEmitter<number>();
  selectedScale: number;
  numberArray: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10];

  // numberArray: number[] = Array.range(10);

  constructor() {
    // not sure if this constructor is needed as we're passing in QuestionDetails object
  }

  addScaleOptions(): void {
    // set systemUsabilityScale in object here
  }

  chooseScale(value: number): void {
    this.selectedScale = value;
    this.chooseScaleEvent.emit(value);
  }
}
