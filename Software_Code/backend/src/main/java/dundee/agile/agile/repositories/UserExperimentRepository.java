package dundee.agile.agile.repositories;

import dundee.agile.agile.model.database.Experiment;
import dundee.agile.agile.model.database.UserExperiment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserExperimentRepository extends JpaRepository<UserExperiment, Long> {
    Optional<UserExperiment> findByExperimentAndResearcherType(Experiment experiment, String researcherType);
}
