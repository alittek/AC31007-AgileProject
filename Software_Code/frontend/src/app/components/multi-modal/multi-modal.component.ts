import { Component, OnInit } from '@angular/core';
import {QuestionDetails} from '../../model/request/question-details';
import {HttpService} from '../../services/http.service';
import {ExperimentDetails} from "../../model/request/experiment-details";
import {EthicalApproval} from "../../model/request/ethical-approval";

@Component({
  selector: 'app-multi-modal',
  templateUrl: './multi-modal.component.html',
  styleUrls: ['./multi-modal.component.css']
})
export class MultiModalComponent implements OnInit {

  data: QuestionDetails;

  constructor(private httpService: HttpService) {
    this.data = new QuestionDetails();
    //set type to multi choice
  }

  ngOnInit(): void {
  }

}
