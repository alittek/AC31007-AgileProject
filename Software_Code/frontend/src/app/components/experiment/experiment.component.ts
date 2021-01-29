import {Component, OnInit} from '@angular/core';
import {ExperimentDetails} from '../../model/request/experiment-details';
import {HttpService} from '../../services/http.service';
import {ActivatedRoute} from '@angular/router';
import {GetExperimentRequest} from '../../model/request/get-experiment-request';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css']
})
export class ExperimentComponent implements OnInit {
  experimentRouteId: number;
  experiment: ExperimentDetails;
  // testing
  // researchers = ['Dr. Example', 'Dr. Example2'];


  constructor(private route: ActivatedRoute, private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getExperiment();
    // get researchers?
  }

  getExperiment(): void {
    this.getExperimentRouteId();
    const getExperimentRequest = new GetExperimentRequest();
    getExperimentRequest.experimentId = this.experimentRouteId;
    this.httpService.getExperiment(getExperimentRequest).subscribe(experiment => this.experiment = experiment);
  }

  getExperimentRouteId(): void {
    this.route.params.subscribe(params => this.experimentRouteId = params.id);
  }
}
