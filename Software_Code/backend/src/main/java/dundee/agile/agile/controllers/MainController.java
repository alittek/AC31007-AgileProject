package dundee.agile.agile.controllers;

import dundee.agile.agile.exceptions.CreateExperimentFailedException;
import dundee.agile.agile.exceptions.CreateQuestionFailedException;
import dundee.agile.agile.exceptions.EthicalApprovalCodeException;
import dundee.agile.agile.exceptions.LoginFailedException;
import dundee.agile.agile.model.database.*;
import dundee.agile.agile.model.enums.Privileges;
import dundee.agile.agile.model.json.request.*;
import dundee.agile.agile.model.json.response.ExperimentDetailsView;
import dundee.agile.agile.model.json.response.UserView;
import dundee.agile.agile.repositories.*;
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
    private final QuestionnairesRepository questionnairesRepository;
    private final QuestionsRepository questionsRepository;

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
        if (createExperimentRequest == null) {
            // TODO: bad request
            throw new CreateExperimentFailedException();
        }
        if (createExperimentRequest.getTitle() == null || createExperimentRequest.getTitle().length() == 0) {
            // TODO: title is required
            throw new CreateExperimentFailedException();
        }
        if (createExperimentRequest.getDescription() == null || createExperimentRequest.getDescription().length() == 0) {
            // TODO: description is required
            throw new CreateExperimentFailedException();
        }
        if (createExperimentRequest.getResearcherId() == null) {
            // TODO: researcher id is required
            throw new CreateExperimentFailedException();
        }
        if (createExperimentRequest.getType() == null || createExperimentRequest.getType().length() == 0) {
            // TODO: type is required
            throw new CreateExperimentFailedException();
        }
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
        throw new CreateExperimentFailedException();
    }

    @PostMapping("/get-experiment")
    public ExperimentDetailsView getExperiment(@RequestBody GetExperimentRequest getExperimentRequest) {
        Optional<Experiment> experimentOptional = experimentsRepository.findById(getExperimentRequest.getExperimentId());
        if (experimentOptional.isPresent()) {
            Experiment experiment = experimentOptional.get();
            ExperimentDetailsView experimentDetails = new ExperimentDetailsView();
            experimentDetails.setDetails(experiment);
            Optional<UserExperiment> userExperimentOptional = userExperimentRepository
                    .findByExperimentAndLevelOfPrivileges(experiment, Privileges.RESEARCHER);
            if (userExperimentOptional.isPresent()) {
                experimentDetails.setResearcherId(userExperimentOptional.get().getUser().getId());
            }
            return experimentDetails;
        }
        return null;
    }

    @PostMapping("/all-experiments")
    public List<ExperimentDetailsView> getAllExperiments(@RequestBody UserIdDetails userId) {
        Optional<User> userOptional = usersRepository.findById(userId.getId());
        if (userOptional.isPresent()) {
            List<Experiment> experimentsList = new ArrayList<>();
            User user = userOptional.get();
            if (user.getLevelOfPrivileges() == Privileges.LAB_MANAGER) {
                experimentsList = experimentsRepository.findAll();
            }
            else {
                List<UserExperiment> userExperimentList = userExperimentRepository.findAllByUser(user);
                for (UserExperiment userExperiment : userExperimentList) {
                    experimentsList.add(userExperiment.getExperiment());
                }
            }
            List<ExperimentDetailsView> experimentDetailsList = new ArrayList<>();
            for (Experiment experiment : experimentsList) {
                ExperimentDetailsView experimentDetails = new ExperimentDetailsView();
                experimentDetails.setDetails(experiment);
                Optional<UserExperiment> userExperimentOptional = userExperimentRepository
                        .findByExperimentAndLevelOfPrivileges(experiment, Privileges.RESEARCHER);
                if (userExperimentOptional.isPresent()) {
                    experimentDetails.setResearcherId(userExperimentOptional.get().getUser().getId());
                }
                experimentDetailsList.add(experimentDetails);
            }
            return experimentDetailsList;
        }
        return null;
    }

    @PostMapping("/approve-ethically")
    public boolean approveEthically(@RequestBody EthicalApprovalRequest ethicalApprovalRequest) {
        if (ethicalApprovalRequest == null || ethicalApprovalRequest.getExperimentId() == null || (ethicalApprovalRequest.isEthicallyApproved() && (ethicalApprovalRequest.getCode() == null || ethicalApprovalRequest.getCode().length() == 0))) {
            throw new EthicalApprovalCodeException();
        }
        Optional<Experiment> experimentOptional = experimentsRepository.findById(ethicalApprovalRequest.getExperimentId());
        if (!experimentOptional.isPresent()) {
            throw new EthicalApprovalCodeException();
        }
        Experiment experiment = experimentOptional.get();
        experiment.setEthicallyApproved(ethicalApprovalRequest.isEthicallyApproved());
        experiment.setEthicalApprovalCode(ethicalApprovalRequest.getCode());
        experimentsRepository.save(experiment);
        return ethicalApprovalRequest.isEthicallyApproved();
    }

    @PostMapping("/create-questionnaire")
    public Long createQuestions(@RequestBody CreateQuestionnaireRequest createQuestionnaireRequest) {
        return -1L;
    }

    @PostMapping("/create-question")
    public Long createQuestion(@RequestBody CreateQuestionRequest createQuestionRequest) {
        if (createQuestionRequest == null) {
            throw new CreateQuestionFailedException();
        }
        if (createQuestionRequest.getQuestionnaireId() == null) {
            throw new CreateQuestionFailedException();
        }
        if (createQuestionRequest.getTitle() == null || createQuestionRequest.getTitle().length() == 0) {
            throw new CreateQuestionFailedException();
        }
        if (createQuestionRequest.getType() == null) {
            throw new CreateQuestionFailedException();
        }
        Optional<Questionnaire> questionnaireOptional = questionnairesRepository.findById(createQuestionRequest.getQuestionnaireId());
        if (questionnaireOptional.isPresent()) {
            Questionnaire questionnaire = questionnaireOptional.get();
            Question question = new Question();
            question.setQuestionnaire(questionnaire);
            question.setTitle(createQuestionRequest.getTitle());
            question.setDescription(createQuestionRequest.getDescription());
            question.setRequired(createQuestionRequest.isRequired());
            question.setType(createQuestionRequest.getType());
            question = questionsRepository.save(question);
            return question.getId();
        }
        throw new CreateQuestionFailedException();
    }
}
