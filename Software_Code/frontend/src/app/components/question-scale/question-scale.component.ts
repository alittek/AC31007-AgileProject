import { Component, OnInit } from '@angular/core';
import {QuestionDetails} from "../../model/request/question-details";

@Component({
  selector: 'app-question-scale',
  templateUrl: './question-scale.component.html',
  styleUrls: ['./question-scale.component.css']
})
export class QuestionScaleComponent {
  data: QuestionDetails;

  constructor() {
    // pass data from backend in here?
  }

  addOptions(){
    // set options to backend here?
  }

}
