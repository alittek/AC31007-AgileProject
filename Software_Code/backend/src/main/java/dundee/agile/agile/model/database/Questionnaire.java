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
@Table(name = "questionnaires")
public class Questionnaire {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @OneToOne
    @JoinColumn(name = "experiment_id")
    public Experiment experiment;
    @OneToMany(mappedBy = "questionnaire")
    private Set<Question> questions;

    private String title;
    private String researcher;
    private String contact;
    private String description;
}
