package dundee.agile.agile.controllers;

import dundee.agile.agile.exceptions.LoginFailedException;
import dundee.agile.agile.model.database.Experiment;
import dundee.agile.agile.model.database.User;
import dundee.agile.agile.model.database.UserExperiment;
import dundee.agile.agile.model.database.UserIdDetails;
import dundee.agile.agile.model.enums.Privileges;
import dundee.agile.agile.model.json.request.CreateExperimentRequest;
import dundee.agile.agile.model.json.request.LoginUserRequest;
import dundee.agile.agile.model.json.request.RegisterUserRequest;
import dundee.agile.agile.model.json.response.ExperimentDetailsView;
import dundee.agile.agile.model.json.response.UserView;
import dundee.agile.agile.repositories.ExperimentsRepository;
import dundee.agile.agile.repositories.UserExperimentRepository;
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
    private final UserExperimentRepository userExperimentRepository;

    @PostMapping("/login")
    public UserView login(@RequestBody LoginUserRequest loginUserRequest) {
        if (loginUserRequest == null || loginUserRequest.getUsername() == null || loginUserRequest.getPassword() == null || loginUserRequest.getUsername().length() == 0 || loginUserRequest.getPassword().length() == 0) {
            throw new LoginFailedException();
        }
        Optional<User> userOptional = usersRepository.findByUsernameEquals(loginUserRequest.getUsername());
        if (userOptional.isPresent() && userOptional.get().getPassword().equals(loginUserRequest.getPassword())) {
            User user = userOptional.get();
            return UserView.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .levelOfPrivileges(user.getLevelOfPrivileges())
                    .build();
        }
        throw new LoginFailedException();
    }

    @PostMapping("/register")
    public void registerUser(@RequestBody RegisterUserRequest registerUserRequest) {
        User user = User.builder()
                .username(registerUserRequest.getUsername())
                .password(registerUserRequest.getPassword())
                .levelOfPrivileges(registerUserRequest.getLevelOfPrivileges() != null ? registerUserRequest.getLevelOfPrivileges() : Privileges.PARTICIPANT)
                .build();
        usersRepository.save(user);
    }

    @PostMapping("/create-experiment")
    public Long createExperiment(@RequestBody CreateExperimentRequest createExperimentRequest) {
        Optional<User> researcher = usersRepository.findById(createExperimentRequest.getResearcherId());
        if (researcher.isPresent()) {
            Experiment experiment = Experiment.builder()
                    .type(createExperimentRequest.getType())
                    .title(createExperimentRequest.getTitle())
                    .description(createExperimentRequest.getDescription())
                    .build();
            experiment = experimentsRepository.save(experiment);

            UserExperiment userExperiment = new UserExperiment();
            userExperiment.setUser(researcher.get());
            userExperiment.setExperiment(experiment);
            userExperiment.setLevelOfPrivileges(Privileges.RESEARCHER);
            userExperimentRepository.save(userExperiment);
            return experiment.getId();
        }
        return -1L;
    }

    @PostMapping("/all-experiments")
    public List<ExperimentDetailsView> getAllExperiments(@RequestBody UserIdDetails userId) {
        Optional<User> user = usersRepository.findById(userId.getId());
        if (user.isPresent()) { // TODO: check if user role is "Lab Manager"
            List<Experiment> experimentsList = experimentsRepository.findAll();
            List<ExperimentDetailsView> experimentDetailsList = new ArrayList<>();
            for (Experiment experiment : experimentsList) {
                ExperimentDetailsView experimentDetails = new ExperimentDetailsView();
                experimentDetails.setTitle(experiment.getTitle());
                experimentDetails.setDescription(experiment.getDescription());
                Optional<UserExperiment> userExperiment = userExperimentRepository
                        .findByExperimentAndLevelOfPrivileges(experiment, Privileges.RESEARCHER);
                if (userExperiment.isPresent()) {
                    experimentDetails.setResearcherId(userExperiment.get().getUser().getId());
                }
                experimentDetailsList.add(experimentDetails);
            }
            return experimentDetailsList;
        }
        return null;
    }
}
