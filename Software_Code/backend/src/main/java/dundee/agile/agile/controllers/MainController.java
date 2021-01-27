package dundee.agile.agile.controllers;

import dundee.agile.agile.objects.*;
import dundee.agile.agile.repositories.ExperimentsRepository;
import dundee.agile.agile.repositories.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class MainController {

    private final UsersRepository usersRepository;
    private final ExperimentsRepository experimentsRepository;

    @PostMapping("/login")
    public Long login(@RequestBody LoginDetails loginDetails) {
        Optional<User> user = usersRepository.findByUsernameEquals(loginDetails.getUsername());
        if (user.isPresent() && user.get().getPassword().equals(loginDetails.getPassword())) {
            return user.get().getId();
        }
        return -1L;
    }

    @PostMapping("/register")
    public Long registerUser(@RequestBody LoginDetails loginDetails) {
        User user = new User();
        user.setUsername(loginDetails.getUsername());
        user.setPassword(loginDetails.getPassword());
        user = usersRepository.save(user);
        return user.getId();
    }

    @PostMapping("/create-experiment")
    public Long createExperiment(@RequestBody ExperimentDetails experimentDetails) {
        Experiment experiment = new Experiment();
        Optional<User> researcher = usersRepository.findById(experimentDetails.getResearcherId());
        if (researcher.isPresent()) {
            experiment.setResearcher(researcher.get());
            experiment.setType(experimentDetails.getType());
            experiment.setName(experimentDetails.getName());
            experiment.setDescription(experimentDetails.getDescription());
            experiment = experimentsRepository.save(experiment);
            return experiment.getId();
        }
        return -1L;
    }

    @PostMapping("/all-experiments")
    public List<ExperimentDetails> getAllExperiments(@RequestBody UserIdDetails userId) {
        Optional<User> user = usersRepository.findById(userId.getId());
        if (user.isPresent()) { // TODO: check if user role is "Lab Manager"
            List<Experiment> experimentsList = experimentsRepository.findAll();
            List<ExperimentDetails> experimentDetailsList = new ArrayList<ExperimentDetails>();
            for (Experiment experiment : experimentsList) {
                ExperimentDetails experimentDetails = new ExperimentDetails();
                experimentDetails.setTitle(experiment.getTitle());
                experimentDetails.setDescription(experiment.getDescription());
                experimentDetails.setResearcherId(experiment.getResearcher().getId());
                experimentDetailsList.add(experimentDetails);
            }
            return experimentDetailsList;
        }
        return null;
    }
}
