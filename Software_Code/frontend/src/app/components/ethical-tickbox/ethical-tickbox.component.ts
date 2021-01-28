import {Component} from '@angular/core';
import {ExperimentDetails} from '../../model/request/experiment-details';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-ethical-tickbox',
  templateUrl: './ethical-tickbox.component.html',
  styleUrls: ['./ethical-tickbox.component.css']
})
export class EthicalTickboxComponent {

  data: ExperimentDetails;

  constructor(private httpService: HttpService) {
    this.data = new ExperimentDetails();
  }

  //update the ethics field
  updateApproval(): void {
    //not made in backend yet
    //this.httpService.updateEthicApproval(this.data);
  }
}
