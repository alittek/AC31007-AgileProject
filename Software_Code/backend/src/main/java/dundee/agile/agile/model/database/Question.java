package dundee.agile.agile.model.database;

import dundee.agile.agile.model.enums.QuestionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Set;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "questionnaire_id")
    private Questionnaire questionnaire;

    @OneToMany(mappedBy = "question")
    private Set<PossibleAnswer> possibleAnswers;

    private String title;
    private String description;
    @Column(columnDefinition = "boolean default false")
    private boolean required;
    private QuestionType type;
    @Column(columnDefinition = "int default 0")
    private int systemUsabilityScale;
}
