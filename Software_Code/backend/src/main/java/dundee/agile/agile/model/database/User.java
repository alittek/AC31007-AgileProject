package dundee.agile.agile.model.database;

import dundee.agile.agile.model.enums.Privileges;
import lombok.*;

import javax.persistence.*;
import java.util.List;

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

    @OneToMany(mappedBy = "researcher")
    private List<Experiment> experiments;

    private String username;
    private String password;
    private Privileges levelOfPrivileges;
}
