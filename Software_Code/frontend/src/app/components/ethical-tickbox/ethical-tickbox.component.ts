import {Component, Input} from '@angular/core';
import {ExperimentDetails} from '../../model/request/experiment-details';
import {HttpService} from '../../services/http.service';
import {EthicalApproval} from '../../model/request/ethical-approval';

@Component({
  selector: 'app-ethical-tickbox',
  templateUrl: './ethical-tickbox.component.html',
  styleUrls: ['./ethical-tickbox.component.css']
})
export class EthicalTickboxComponent {

  @Input()
  data: ExperimentDetails;

  constructor(private httpService: HttpService) {
    this.data = new ExperimentDetails();
  }

  // update the ethics field
  updateApproval(): void {
    this.data.ethicallyApproved = !this.data.ethicallyApproved;
    const ethicalApproval = new EthicalApproval(this.data.id, this.data.ethicallyApproved);
    this.httpService.updateEthicApproval(ethicalApproval).subscribe(value => {
      this.data.ethicallyApproved = value;
    });
  }
}
