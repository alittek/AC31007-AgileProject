import {Component, OnInit} from '@angular/core';
import {ExperimentDetails} from '../../model/request/experiment-details';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-experiments-list',
  templateUrl: './experiments-list.component.html',
  styleUrls: ['./experiments-list.component.css']
})
export class ExperimentsListComponent implements OnInit {
  experiments: ExperimentDetails[];


  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getAllExperiments();
  }

  // for testing backend
  getAllExperiments(): void {
    this.httpService.getAllExperiments()
      .subscribe(experiments => this.experiments = experiments);
  }

}
