import {Privileges} from '../enums/privileges.enum';

export class UserView {
  id: number;
  username: string;
  levelOfPrivileges: Privileges;
}
