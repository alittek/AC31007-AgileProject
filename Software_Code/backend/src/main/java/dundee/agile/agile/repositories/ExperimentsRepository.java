package dundee.agile.agile.repositories;

import dundee.agile.agile.model.database.Experiment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExperimentsRepository extends JpaRepository<Experiment, Long> {
}
