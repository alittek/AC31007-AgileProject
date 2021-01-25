import { Component, OnInit } from '@angular/core';
import { Experiment} from "../objects/experiment";

@Component({
  selector: 'app-experiment-list',
  templateUrl: './experiment-list.component.html',
  styleUrls: ['./experiment-list.component.css']
})
export class ExperimentListComponent implements OnInit{
  //placeholder data
  experiments:Experiment[];

  constructor() {}

  ngOnInit(){
    this.experiments = [
      {
        id: 1, title:"Test Title", description:"a dummy description", approved:false
      },
      {
        id: 2, title:"Test Title 2", description:"a dummy description", approved:false
      }
    ]


  }
}
