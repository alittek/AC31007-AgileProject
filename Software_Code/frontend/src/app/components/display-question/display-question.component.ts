import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-question',
  templateUrl: './display-question.component.html',
  styleUrls: ['./display-question.component.css']
})
export class DisplayQuestionComponent implements OnInit {
  //placeholder data
  question = ['This is an example of a question title?', 'multi', 'Description of question if we are including this.', 'radio', 'option1', 'option2'];

  constructor() {}



  ngOnInit(): void {
  }

}
