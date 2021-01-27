import {Component} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {ExperimentDetails} from '../../model/request/experiment-details';

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
    name: 'Experiment 1',
    description: 'Interesting experiment'
  };

  constructor(private httpService: HttpService) {
  }

  createExperiment(): void {
    this.httpService.createExperiment(this.data);
  }
}
