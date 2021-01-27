package dundee.agile.agile.repositories;

import dundee.agile.agile.objects.UserExperiment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserExperimentRepository extends JpaRepository<UserExperiment, Long> {
}
