import { Component, OnInit } from '@angular/core';
import { Experiment} from "../objects/experiment";
import { HttpService} from "../services/http.service";

@Component({
  selector: 'app-experiment-list',
  templateUrl: './experiment-list.component.html',
  styleUrls: ['./experiment-list.component.css']
})
export class ExperimentListComponent implements OnInit{
  //list of experiments
  experiments:Experiment[];

  constructor(private httpService: HttpService) {}

  ngOnInit(){
    //this.httpService.getExperiments().subscribe()

    //placeholder data
    this.experiments = [
      {
        id: 1, title:"Test Experiment Title", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", type:"Questionnaire", approved:true
      },
      {
        id: 2, title:"Test Experiment Title 2", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", type:"Questionnaire", approved:false
      },
      {
        id: 3, title:"Test Experiment Title 3", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", type:"Questionnaire", approved:false
      }
    ]
  }
}
