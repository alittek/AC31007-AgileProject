export class EthicalApproval {
  constructor(experimentId: number, ethicallyApproved: boolean) {
    this.experimentId = experimentId;
    this.ethicallyApproved = ethicallyApproved;
  }

  ethicallyApproved: boolean;
  experimentId: number;
}
