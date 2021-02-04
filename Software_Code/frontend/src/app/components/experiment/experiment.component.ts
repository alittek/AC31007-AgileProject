import {Component, OnInit} from '@angular/core';
import {ExperimentDetails} from '../../model/request/experiment-details';
import {HttpService} from '../../services/http.service';
import {ActivatedRoute} from '@angular/router';
import {GetExperimentRequest} from '../../model/request/get-experiment-request';
import {ExperimentDetailsView} from '../../model/response/experiment-details-view';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css']
})
export class ExperimentComponent implements OnInit {
  experimentRouteId: number;
  experiment: ExperimentDetailsView;

  constructor(private route: ActivatedRoute, private httpService: HttpService) {
    this.experiment = new ExperimentDetailsView();
  }

  ngOnInit(): void {
    this.getExperiment();
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
