import {Component, Input, OnInit} from '@angular/core';
import {QuestionDetails} from "../../model/request/question-details";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-display-question',
  templateUrl: './display-question.component.html',
  styleUrls: ['./display-question.component.css']
})
export class DisplayQuestionComponent implements OnInit {
  @Input()
  question: QuestionDetails;


  constructor() {}

  ngOnInit(): void {
  }

  //returning array of [0..] for making the scale front-end
  getScale() {
    let scale: number[] = [];
    for (let i = 0; i <= this.question.systemUsabilityScale; i++) {
      scale.push(i);
    }
    return scale;
  }


}
