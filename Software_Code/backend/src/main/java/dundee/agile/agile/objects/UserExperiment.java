package dundee.agile.agile.objects;

import dundee.agile.agile.model.database.User;
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
@Table(name = "userexperiment")
public class UserExperiment {
    @Id
    private Long userExperimentId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    public User user;
}
