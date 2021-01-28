import { Component, OnInit, OnDestroy } from '@angular/core';
import {ExperimentDetails} from "../../model/request/experiment-details";
import {HttpService} from "../../services/http.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css']
})
export class ExperimentComponent implements OnInit{
  experiment: ExperimentDetails;
  //testing
  researchers = ["Dr. Example", "Dr. Example2"];


  constructor(private route: ActivatedRoute, private httpService: HttpService) {
    this.route.params.subscribe( params => console.log(params) );
    //placeholder data
    this.experiment = new ExperimentDetails();
    this.experiment.title = "ExperimentTitle";
    this.experiment.description = "For digital applications always use the specified RGB breakdowns for each colours. The colour breakdowns in this guide have been formulated for optimum results on coated matt sheets. If printing in CMYK, always use the exact colour breakdowns specified.";
    this.experiment.type = "Questionnaire";
    this.experiment.approved = true;
  }

  ngOnInit(){
    //get experiment
    //get researchers?
  }

  getExperiment() {
    //not implemented backend yet
    // this.httpService.getExperiment().subscribe(experiment => this.experiment = experiment);
  }

}
