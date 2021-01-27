import {Component} from '@angular/core';
import {HttpService} from '../services/http.service';
import {Experiment} from '../objects/experiment';
import {ExperimentDetails} from "../objects/experiment-details";

@Component({
  selector: 'app-create-experiment-form',
  templateUrl: './create-experiment-form.component.html',
  styleUrls: ['./create-experiment-form.component.css']
})
export class CreateExperimentFormComponent {

  data: ExperimentDetails;

  //test data 
  
  constructor(private httpService: HttpService) {
    this.data = new ExperimentDetails();
  }

  createExperiment(): void {
    this.httpService.createExperiment(this.data);
  }
}
