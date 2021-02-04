package dundee.agile.agile.repositories;

import dundee.agile.agile.model.database.Question;
import dundee.agile.agile.model.database.Questionnaire;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionsRepository extends JpaRepository<Question, Long> {
    List<Question> findAllByQuestionnaire(Questionnaire questionnaire);
}
