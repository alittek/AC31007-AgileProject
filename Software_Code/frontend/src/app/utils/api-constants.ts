export class ApiConstants {
  private static BASE_URL = 'http://localhost:8080';

  public static LOGIN = ApiConstants.BASE_URL + '/login';
  public static REGISTER = ApiConstants.BASE_URL + '/register';

  public static CREATE_EXPERIMENT = ApiConstants.BASE_URL + '/create-experiment';
}
