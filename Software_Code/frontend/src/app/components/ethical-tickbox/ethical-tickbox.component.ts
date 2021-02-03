import {Component, Input, OnInit} from '@angular/core';
import {ExperimentDetails} from '../../model/request/experiment-details';
import {HttpService} from '../../services/http.service';
import {EthicalApproval} from '../../model/request/ethical-approval';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-ethical-tickbox',
  templateUrl: './ethical-tickbox.component.html',
  styleUrls: ['./ethical-tickbox.component.css']
})
export class EthicalTickboxComponent implements OnInit {

  @Input()
  data: ExperimentDetails;

  checkbox: boolean;
  errorText: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.checkbox = this.data.ethicallyApproved;
  }

  // update the ethics field
  updateApproval(): void {
    if (this.checkbox && (!this.data.ethicalApprovalCode || this.data.ethicalApprovalCode.length === 0)) {
      this.errorText.next('Ethical approval code must be entered');
      return;
    }
    this.data.ethicallyApproved = this.checkbox;
    const ethicalApproval = new EthicalApproval(this.data.id, this.data.ethicallyApproved, this.data.ethicalApprovalCode);
    this.httpService.updateEthicApproval(ethicalApproval).subscribe(value => {
      this.data.ethicallyApproved = value;
      this.errorText.next(null);
    }, error => {
      if (error.status === 0) {
        this.errorText.next('Error connecting to the backend.');
      } else if (error.status === 400) {
        this.errorText.next('Ethical approval code is incorrect.');
      } else {
        this.errorText.next('Unexpected error.');
      }
    });
  }
}
