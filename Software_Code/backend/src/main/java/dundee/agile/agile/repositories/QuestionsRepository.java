package dundee.agile.agile.repositories;

import dundee.agile.agile.model.database.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionsRepository extends JpaRepository<Question, Long> {
}
