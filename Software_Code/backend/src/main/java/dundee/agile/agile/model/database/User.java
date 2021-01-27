package dundee.agile.agile.model.database;

import dundee.agile.agile.model.enums.Privileges;
import dundee.agile.agile.objects.UserExperiment;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @OneToMany(mappedBy = "user")
    Set<UserExperiment> link;

    private String username;
    private String password;
    private Privileges levelOfPrivileges;
}
