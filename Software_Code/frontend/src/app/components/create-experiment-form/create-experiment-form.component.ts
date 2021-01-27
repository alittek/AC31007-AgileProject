import {Component} from '@angular/core';
import {HttpService} from '../services/http.service';
import {ExperimentDetails} from '../objects/experiment-details';

@Component({
  selector: 'app-create-experiment-form',
  templateUrl: './create-experiment-form.component.html',
  styleUrls: ['./create-experiment-form.component.css']
})
export class CreateExperimentFormComponent {
  // data for testing backend
  data: ExperimentDetails = {
    researcherId: 1,
    type: 'Questionnaire',
    title: 'Experiment 1',
    description: 'Interesting experiment'
  };

  constructor(private httpService: HttpService) {
  }

  createExperiment(): void {
    this.httpService.createExperiment(this.data);
  }
}
