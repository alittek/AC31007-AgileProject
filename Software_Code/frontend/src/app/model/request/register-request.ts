import {Privileges} from '../enums/privileges.enum';

export class RegisterRequest {
  username: string;
  password: string;
  levelOfPrivileges: Privileges;
}
