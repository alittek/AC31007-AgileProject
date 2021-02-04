import {Component} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {ExperimentDetails} from '../../model/request/experiment-details';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-experiment-form',
  templateUrl: './create-experiment-form.component.html',
  styleUrls: ['./create-experiment-form.component.css']
})
export class CreateExperimentFormComponent {
  data: ExperimentDetails;
  isCreated: boolean;
  creationStatusText: BehaviorSubject<string>;

  constructor(private httpService: HttpService,
              private router: Router) {
    this.data = new ExperimentDetails();
    this.data.researcherId = parseInt(localStorage.getItem('userId'), 10);
    this.isCreated = false;
    this.creationStatusText = new BehaviorSubject(null);
  }

  createExperiment(): void {
    this.httpService.createExperiment(this.data).subscribe(value => {
      this.isCreated = true;
      this.creationStatusText.next('Experiment created successfully');
      this.router.navigateByUrl('/experiments/' + value);
    }, error => {
      this.isCreated = false;
      if (error.status === 0) {
        this.creationStatusText.next('Error connecting to the backend.');
      } else if (error.status === 400) {
        this.creationStatusText.next('Create experiment details are missing');
      } else {
        this.creationStatusText.next('Unexpected error.');
      }
    });
  }
}
