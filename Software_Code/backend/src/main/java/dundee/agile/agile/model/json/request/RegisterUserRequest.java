package dundee.agile.agile.model.json.request;

import dundee.agile.agile.model.enums.Privileges;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserRequest {
    private String username;
    private String password;
    private Privileges levelOfPrivileges;
}
