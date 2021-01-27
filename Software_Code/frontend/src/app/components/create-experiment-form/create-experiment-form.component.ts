import {Component} from '@angular/core';
import {HttpService} from '../services/http.service';
import {ExperimentDetails} from "../objects/experiment-details";

@Component({
  selector: 'app-create-experiment-form',
  templateUrl: './create-experiment-form.component.html',
  styleUrls: ['./create-experiment-form.component.css']
})
export class CreateExperimentFormComponent {
  data: ExperimentDetails;

  constructor(private httpService: HttpService) {
    this.data = new ExperimentDetails();
    this.data.researcherId = parseInt(localStorage.getItem('userId'), 10);
  }

  createExperiment(): void {
    this.httpService.createExperiment(this.data);
  }
}
