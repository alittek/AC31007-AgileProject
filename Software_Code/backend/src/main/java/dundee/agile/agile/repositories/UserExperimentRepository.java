package dundee.agile.agile.repositories;

import dundee.agile.agile.model.database.Experiment;
import dundee.agile.agile.model.database.UserExperiment;
import dundee.agile.agile.model.enums.Privileges;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserExperimentRepository extends JpaRepository<UserExperiment, Long> {
    Optional<UserExperiment> findByExperimentAndLevelOfPrivileges(Experiment experiment, Privileges levelOfPrivileges);
}
