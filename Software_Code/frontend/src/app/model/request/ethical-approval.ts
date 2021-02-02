export class EthicalApproval {
  constructor(experimentId: number, ethicallyApproved: boolean, code: string) {
    this.experimentId = experimentId;
    this.ethicallyApproved = ethicallyApproved;
    this.code = code;
  }

  ethicallyApproved: boolean;
  experimentId: number;
  code: string;
}
