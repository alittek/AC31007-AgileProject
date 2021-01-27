package dundee.agile.agile.model.database;

import lombok.*;

import javax.persistence.*;

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

    @ManyToOne
    @JoinColumn(name = "researcherId", nullable = false)
    public User researcher;

    private String type;
    private String name;
    private String description;
    @Column(columnDefinition = "boolean default false")
    private boolean hasEthicalApproval;
}
