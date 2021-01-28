import {Component} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {ExperimentDetails} from '../../model/request/experiment-details';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-create-experiment-form',
  templateUrl: './create-experiment-form.component.html',
  styleUrls: ['./create-experiment-form.component.css']
})
export class CreateExperimentFormComponent {
  data: ExperimentDetails;
  errorText: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private httpService: HttpService) {
    this.data = new ExperimentDetails();
    this.data.researcherId = parseInt(localStorage.getItem('userId'), 10);
  }

  createExperiment(): void {
    this.httpService.createExperiment(this.data).subscribe(value => {}, error => {
      if (error.status === 0) {
        this.errorText.next('Error connecting to the backend.');
      } else if (error.status === 400) {
        this.errorText.next('Create experiment details are missing');
      } else {
        this.errorText.next('Unexpected error.');
      }
    });
  }
}
