import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-question',
  templateUrl: './display-question.component.html',
  styleUrls: ['./display-question.component.css']
})
export class DisplayQuestionComponent implements OnInit {
  //placeholder data
  question = ['This is an example of a question title?', 'open', 'Description of question if we are including this.'];

  constructor() {}



  ngOnInit(): void {
  }

}
