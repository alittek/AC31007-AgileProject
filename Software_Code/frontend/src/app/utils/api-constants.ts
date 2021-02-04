export class ApiConstants {
  private static BASE_URL = 'http://localhost:8080';

  public static LOGIN = ApiConstants.BASE_URL + '/login';
  public static REGISTER = ApiConstants.BASE_URL + '/register';

  public static CREATE_EXPERIMENT = ApiConstants.BASE_URL + '/create-experiment';
  public static GET_EXPERIMENT = ApiConstants.BASE_URL + '/get-experiment';
  public static ALL_EXPERIMENTS = ApiConstants.BASE_URL + '/all-experiments';
  public static CREATE_QUESTIONNAIRE = ApiConstants.BASE_URL + '/create-questionnaire';
  public static CREATE_QUESTION = ApiConstants.BASE_URL + '/create-question';
  public static APPROVE_ETHICALLY = ApiConstants.BASE_URL + '/approve-ethically';
  public static GET_QUESTIONNAIRE = ApiConstants.BASE_URL + '/get-questionnaire';
}
