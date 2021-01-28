import { Component, OnInit } from '@angular/core';
import {ExperimentDetails} from "../../model/request/experiment-details";

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css']
})
export class ExperimentComponent implements OnInit {
  experiment: ExperimentDetails;

  constructor()
   {
     this.experiment = new ExperimentDetails();
   }

  ngOnInit(): void {
    this.experiment.title = "Experiment Title";
    this.experiment.description = "For digital applications always use the specified RGB breakdowns for each colours. The colour breakdowns in this guide have been formulated for optimum results on coated matt sheets. If printing in CMYK, always use the exact colour breakdowns specified.";
    this.experiment.type = "Questionnaire";

  }

}
