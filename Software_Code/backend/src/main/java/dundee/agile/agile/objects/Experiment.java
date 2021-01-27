package dundee.agile.agile.objects;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
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
