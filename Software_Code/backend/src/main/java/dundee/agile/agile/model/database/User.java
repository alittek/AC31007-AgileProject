package dundee.agile.agile.model.database;

import java.util.Set;

import dundee.agile.agile.model.database.UserExperiment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
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
}
