package dundee.agile.agile.repositories;

import dundee.agile.agile.model.database.PossibleAnswer;
import dundee.agile.agile.model.database.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PossibleAnswerRepository extends JpaRepository<PossibleAnswer, Long> {
    List<PossibleAnswer> findAllByQuestion(Question question);
}
