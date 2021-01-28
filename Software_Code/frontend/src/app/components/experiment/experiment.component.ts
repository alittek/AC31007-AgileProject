import { Component, OnInit } from '@angular/core';
import {ExperimentDetails} from "../../model/request/experiment-details";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css']
})
export class ExperimentComponent implements OnInit{
  experiment: ExperimentDetails;


  constructor(private httpService: HttpService) {
    //placeholder data
    this.experiment = new ExperimentDetails();
    this.experiment.title = "Experiment Title";
    this.experiment.description = "For digital applications always use the specified RGB breakdowns for each colours. The colour breakdowns in this guide have been formulated for optimum results on coated matt sheets. If printing in CMYK, always use the exact colour breakdowns specified.";
    this.experiment.type = "Questionnaire";
    this.experiment.approved = true;
  }

  ngOnInit(): void {
    //this.getExperiment();
    //get researchers?
  }


  getExperiment() {
    //not implemented backend yet
    // this.httpService.getExperiment().subscribe(experiment => this.experiment = experiment);
  }

}
