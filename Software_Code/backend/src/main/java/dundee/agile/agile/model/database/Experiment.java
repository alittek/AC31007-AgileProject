package dundee.agile.agile.model.database;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "experiments")
public class Experiment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @OneToMany(mappedBy = "experiment")
    Set<UserExperiment> link;

    private String type;
    private String title;
    private String description;
    @Column(columnDefinition = "boolean default false")
    private boolean hasEthicalApproval;
}
