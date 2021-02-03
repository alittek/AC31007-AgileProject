package dundee.agile.agile.model.database;

import dundee.agile.agile.model.enums.QuestionType;
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
@Table(name = "possibleanswer")
public class PossibleAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    private String Answer;
}
