import {Component, OnInit} from '@angular/core';
import {ExperimentDetails} from '../objects/experiment-details';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-experiments-list',
  templateUrl: './experiments-list.component.html',
  styleUrls: ['./experiments-list.component.css']
})
export class ExperimentsListComponent implements OnInit {
  experiments: ExperimentDetails[];

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getAllExperiments();
    //placeholder data for show
    this.experiments = [
      {
        researcherId: 1, name:"Test Experiment Title", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.", type:"Questionnaire", approved:true
      },
      {
        researcherId: 1, name:"Test Experiment Title 2", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", type:"Questionnaire", approved:false
      },
      {
        researcherId: 1, name:"Test Experiment Title 3", description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", type:"Questionnaire", approved:false
      }
    ]
  }

  // for testing backend
  getAllExperiments(){
    this.httpService.getAllExperiments()
      .subscribe(experiments => this.experiments = experiments);
  }

}
