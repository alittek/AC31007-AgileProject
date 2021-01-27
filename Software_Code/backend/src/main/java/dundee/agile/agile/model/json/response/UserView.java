package dundee.agile.agile.model.json.response;

import dundee.agile.agile.model.enums.Privileges;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserView {
    private Long id;
    private String username;
    private Privileges levelOfPrivileges;
}
