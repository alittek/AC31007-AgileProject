package dundee.agile.agile.controllers;

import dundee.agile.agile.exceptions.*;
import dundee.agile.agile.model.database.*;
import dundee.agile.agile.model.enums.Privileges;
import dundee.agile.agile.model.json.request.*;
import dundee.agile.agile.model.json.response.ExperimentDetailsView;
import dundee.agile.agile.model.json.response.QuestionView;
import dundee.agile.agile.model.json.response.QuestionnaireView;
import dundee.agile.agile.model.json.response.UserView;
import dundee.agile.agile.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class MainController {

    private final UsersRepository usersRepository;
    private final ExperimentsRepository experimentsRepository;
    private final UserExperimentRepository userExperimentRepository;
    private final QuestionnairesRepository questionnairesRepository;
    private final QuestionsRepository questionsRepository;
    private final PossibleAnswerRepository possibleAnswerRepository;

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
            throw new CreateExperimentFailedException();
        }
        if (createExperimentRequest.getTitle() == null || createExperimentRequest.getTitle().length() == 0) {
            throw new CreateExperimentFailedException();
        }
        if (createExperimentRequest.getDescription() == null || createExperimentRequest.getDescription().length() == 0) {
            throw new CreateExperimentFailedException();
        }
        if (createExperimentRequest.getResearcherId() == null) {
            throw new CreateExperimentFailedException();
        }
        if (createExperimentRequest.getType() == null || createExperimentRequest.getType().length() == 0) {
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
            } else {
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
    public Long createQuestionnaire(@RequestBody CreateQuestionnaireRequest createQuestionnaireRequest) {
        if (createQuestionnaireRequest == null || createQuestionnaireRequest.getExperimentId() == null) {
            throw new CreateQuestionnaireFailedException();
        }
        if (createQuestionnaireRequest.getTitle() == null || createQuestionnaireRequest.getTitle().length() == 0) {
            throw new CreateQuestionnaireFailedException();
        }
        if (createQuestionnaireRequest.getResearcher() == null || createQuestionnaireRequest.getResearcher().length() == 0) {
            throw new CreateQuestionnaireFailedException();
        }
        if (createQuestionnaireRequest.getContact() == null || createQuestionnaireRequest.getContact().length() == 0) {
            throw new CreateQuestionnaireFailedException();
        }
        if (createQuestionnaireRequest.getDescription() == null || createQuestionnaireRequest.getDescription().length() == 0) {
            throw new CreateQuestionnaireFailedException();
        }

        Optional<Experiment> experimentOptional = experimentsRepository.findById(createQuestionnaireRequest.getExperimentId());
        if (!experimentOptional.isPresent()) {
            throw new CreateQuestionnaireFailedException();
        }
        Experiment experiment = experimentOptional.get();
        Questionnaire questionnaire = Questionnaire.builder()
                .experiment(experiment)
                .contact(createQuestionnaireRequest.getContact())
                .description(createQuestionnaireRequest.getDescription())
                .title(createQuestionnaireRequest.getTitle())
                .researcher(createQuestionnaireRequest.getResearcher())
                .build();
        questionnaire = questionnairesRepository.save(questionnaire);
        return questionnaire.getId();
    }

    @PostMapping("/get-questionnaire")
    public QuestionnaireView getQuestionnaire(@RequestBody GetQuestionnaireRequest getQuestionnaireRequest) {
        if (getQuestionnaireRequest == null || getQuestionnaireRequest.getQuestionnaireId() == null) {
            throw new GetQuestionnaireException();
        }
        Optional<Questionnaire> questionnaireOptional = questionnairesRepository.findById(getQuestionnaireRequest.getQuestionnaireId());
        if (!questionnaireOptional.isPresent()) {
            throw new GetQuestionnaireException();
        }
        Questionnaire questionnaire = questionnaireOptional.get();
        QuestionnaireView questionnaireView = QuestionnaireView.builder()
                .contact(questionnaire.getContact())
                .researcher(questionnaire.getResearcher())
                .description(questionnaire.getDescription())
                .title(questionnaire.getTitle())
                .build();
        if (questionnaire.getExperiment() != null && questionnaire.getExperiment().getId() != null) {
            questionnaireView.setExperimentId(questionnaire.getExperiment().getId());
        }
        return questionnaireView;
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
            question.setSystemUsabilityScale(createQuestionRequest.getSystemUsabilityScale());

            question = questionsRepository.save(question);
            if (createQuestionRequest.getAnswers() != null && createQuestionRequest.getAnswers().length > 0) {
                Question finalQuestion = question;
                Set<PossibleAnswer> possibleAnswers = Arrays.stream(createQuestionRequest.getAnswers())
                        .map(answer -> PossibleAnswer.builder()
                                .Answer(answer)
                                .question(finalQuestion)
                                .build())
                        .collect(Collectors.toSet());
                possibleAnswerRepository.saveAll(possibleAnswers);
            }
            return question.getId();
        }
        throw new CreateQuestionFailedException();
    }

    @PostMapping("/get-questions")
    public List<QuestionView> getQuestions(@RequestBody GetQuestionnaireRequest getQuestionnaireRequest) {
        Optional<Questionnaire> questionnaireOptional = questionnairesRepository.findById(getQuestionnaireRequest.getQuestionnaireId());
        if (questionnaireOptional.isPresent()) {
            List<QuestionView> questionViewList = new ArrayList<>();
            List<Question> questionList = questionsRepository.findAllByQuestionnaire(questionnaireOptional.get());
            for (Question question : questionList) {
                QuestionView questionView = QuestionView.builder()
                        .title(question.getTitle())
                        .description(question.getDescription())
                        .type(question.getType().getNumericValue())
                        .required(question.isRequired())
                        .systemUsabilityScale(question.getSystemUsabilityScale())
                        .build();
                List<PossibleAnswer> possibleAnswerList = possibleAnswerRepository.findAllByQuestion(question);
                List<String> answerList = new ArrayList<>();
                for (PossibleAnswer possibleAnswer : possibleAnswerList) {
                    answerList.add(possibleAnswer.getAnswer());
                }
                questionView.setAnswers(answerList.toArray(new String[0]));
                questionViewList.add(questionView);
            }
            return questionViewList;
        }
        return null;
    }
}
