import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoginRequest} from '../model/request/login-request';
import {ExperimentDetails} from '../model/request/experiment-details';
import {QuestionnaireDetails} from '../model/request/questionnaire-details';
import {QuestionDetails} from '../model/request/question-details';
import {UserId} from '../model/request/user-id';
import {Observable} from 'rxjs';
import {UserView} from '../model/response/user-view';
import {ApiConstants} from '../utils/api-constants';
import {GetExperimentRequest} from '../model/request/get-experiment-request';
import {EthicalApproval} from '../model/request/ethical-approval';
import {GetQuestionnaireRequest} from '../model/request/get-questionnaire-request';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  login(loginDetails: LoginRequest): Observable<UserView> {
    return this.httpClient.post<UserView>(ApiConstants.LOGIN, loginDetails);
  }

  register(loginDetails: LoginRequest): Observable<any> {
    return this.httpClient.post(ApiConstants.REGISTER, loginDetails);
  }

  createExperiment(experimentDetails: ExperimentDetails): Observable<any> {
    return this.httpClient.post<string>(ApiConstants.CREATE_EXPERIMENT, experimentDetails);
  }

  getExperiment(getExperimentRequest: GetExperimentRequest): Observable<ExperimentDetails> {
    return this.httpClient.post<ExperimentDetails>(ApiConstants.GET_EXPERIMENT, getExperimentRequest);
  }

  getAllExperiments(): Observable<ExperimentDetails[]> {
    const userId = new UserId();
    userId.id = parseInt(localStorage.getItem('userId'), 10);
    return this.httpClient.post<ExperimentDetails[]>(ApiConstants.ALL_EXPERIMENTS, userId);
  }

  createQuestionnaire(questionnaireDetails: QuestionnaireDetails): Observable<any> {
    return this.httpClient.post<string>(ApiConstants.CREATE_QUESTIONNAIRE, questionnaireDetails);
  }

  createQuestion(questionDetails: QuestionDetails): Observable<any> {
    return this.httpClient.post<string>(ApiConstants.CREATE_QUESTION, questionDetails);
  }

  updateEthicApproval(ethicalApproval: EthicalApproval): Observable<boolean> {
    return this.httpClient.post<boolean>(ApiConstants.APPROVE_ETHICALLY, ethicalApproval);
  }

  getQuestionnaire(questionnaireId: number): Observable<QuestionnaireDetails> {
    const questionnaireRequest = new GetQuestionnaireRequest();
    questionnaireRequest.questionnaireId = questionnaireId;
    return this.httpClient.post<QuestionnaireDetails>(ApiConstants.GET_QUESTIONNAIRE, questionnaireRequest);
  }
}
