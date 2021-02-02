package dundee.agile.agile.repositories;

import dundee.agile.agile.model.database.Questionnaire;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionnairesRepository extends JpaRepository<Questionnaire, Long> {
}
