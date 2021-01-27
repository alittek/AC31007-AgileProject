package dundee.agile.agile.model.database;

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
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long userExperimentId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    public User user;
    @ManyToOne
    @JoinColumn(name = "experiment_id")
    public Experiment experiment;

    private String researcherType;
}
