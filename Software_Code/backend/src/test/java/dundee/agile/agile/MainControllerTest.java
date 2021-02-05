package dundee.agile.agile;

import dundee.agile.agile.controllers.MainController;
import dundee.agile.agile.exceptions.CreateQuestionFailedException;
import dundee.agile.agile.exceptions.CreateQuestionnaireFailedException;
import dundee.agile.agile.exceptions.EthicalApprovalCodeException;
import dundee.agile.agile.model.database.Experiment;
import dundee.agile.agile.model.database.Question;
import dundee.agile.agile.model.database.Questionnaire;
import dundee.agile.agile.model.enums.QuestionType;
import dundee.agile.agile.model.json.request.CreateQuestionRequest;
import dundee.agile.agile.model.json.request.CreateQuestionnaireRequest;
import dundee.agile.agile.model.json.request.EthicalApprovalRequest;
import dundee.agile.agile.repositories.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class MainControllerTest {

    @Autowired
    private UsersRepository usersRepository;
    @Mock
    private ExperimentsRepository experimentsRepository;
    @Autowired
    private UserExperimentRepository userExperimentRepository;
    @Mock
    private QuestionnairesRepository questionnairesRepository;

    @Mock
    private QuestionsRepository questionsRepository;
    @Autowired PossibleAnswerRepository possibleAnswerRepository;

    private MainController mainController;

    @BeforeEach
    public void setUp() {
        Mockito.when(experimentsRepository.findById(anyLong())).thenAnswer(
                invocation -> {
                    Object argument = invocation.getArgument(0);
                    if (argument.equals(1L)) {
                        return Optional.of(Experiment.builder()
                                .id(1L)
                                .build());
                    }
                    return Optional.empty();
                });
        Mockito.when(questionnairesRepository.save(any())).thenReturn(Questionnaire.builder().id(1L).build());

        Mockito.when(questionnairesRepository.findById(anyLong())).thenAnswer(
                invocation -> {
                    Object argument = invocation.getArgument(0);
                    if (argument.equals(1L)) {
                        return Optional.of(Questionnaire.builder()
                                .id(1L)
                                .build());
                    }
                    return Optional.empty();
                });

        Mockito.when(questionsRepository.save(any())).thenReturn(Question.builder().id(1L).build());

        mainController = new MainController(usersRepository, experimentsRepository, userExperimentRepository, questionnairesRepository, questionsRepository, possibleAnswerRepository);
    }

    @Test
    @DisplayName("Set ethical approval to true")
    public void testEthicalApprovalSetting() {
        EthicalApprovalRequest ethicalApprovalRequest = EthicalApprovalRequest.builder()
                .ethicallyApproved(true)
                .experimentId(1L)
                .code("0")
                .build();

        Assertions.assertTrue(mainController.approveEthically(ethicalApprovalRequest));
    }

    @Test
    @DisplayName("Ethical approval fake experiment id")
    public void testEthicalApprovalWithFakeExperimentId() {
        EthicalApprovalRequest ethicalApprovalRequest = EthicalApprovalRequest.builder()
                .ethicallyApproved(true)
                .experimentId(2L)
                .code("0")
                .build();

        Assertions.assertThrows(EthicalApprovalCodeException.class, () -> mainController.approveEthically(ethicalApprovalRequest));
    }

    @Test
    @DisplayName("Ethical approval no approval code")
    public void testEthicalApprovalWithoutCode() {
        EthicalApprovalRequest ethicalApprovalRequest = EthicalApprovalRequest.builder()
                .ethicallyApproved(true)
                .experimentId(1L)
                .build();

        Assertions.assertThrows(EthicalApprovalCodeException.class, () -> mainController.approveEthically(ethicalApprovalRequest));
    }

    @Test
    @DisplayName("Create new question with all required fields")
    public void testCreateQuestionCorrectDetails() {
        CreateQuestionRequest createQuestionRequest = CreateQuestionRequest.builder()
                .questionnaireId(1L)
                .title("Title")
                .type(QuestionType.OPEN)
                .required(true)
                .build();

        Assertions.assertEquals(1L, mainController.createQuestion(createQuestionRequest));
    }

    @Test
    @DisplayName("Create new question with fake questionnaireId")
    public void testCreateQuestionWithFakeQuestionnaireId() {
        CreateQuestionRequest createQuestionRequest = CreateQuestionRequest.builder()
                .questionnaireId(2L)
                .title("Title")
                .type(QuestionType.OPEN)
                .required(true)
                .build();

        Assertions.assertThrows(CreateQuestionFailedException.class, () -> mainController.createQuestion(createQuestionRequest));
    }

    @Test
    @DisplayName("Create new question with missing questionnaireId")
    public void testCreateQuestionWithMissingQuestionnaireId() {
        CreateQuestionRequest createQuestionRequest = CreateQuestionRequest.builder()
                .title("Title")
                .type(QuestionType.OPEN)
                .required(true)
                .build();

        Assertions.assertThrows(CreateQuestionFailedException.class, () -> mainController.createQuestion(createQuestionRequest));
    }

    @Test
    @DisplayName("Create new question with missing title")
    public void testCreateQuestionWithMissingTitle() {
        CreateQuestionRequest createQuestionRequest = CreateQuestionRequest.builder()
                .questionnaireId(1L)
                .type(QuestionType.OPEN)
                .required(true)
                .build();

        Assertions.assertThrows(CreateQuestionFailedException.class, () -> mainController.createQuestion(createQuestionRequest));
    }

    @Test
    @DisplayName("Create new question with missing type")
    public void testCreateQuestionWithMissingType() {
        CreateQuestionRequest createQuestionRequest = CreateQuestionRequest.builder()
                .questionnaireId(1L)
                .title("Title")
                .required(true)
                .build();

        Assertions.assertThrows(CreateQuestionFailedException.class, () -> mainController.createQuestion(createQuestionRequest));
    }

    @Test
    @DisplayName("Successful questionnaire saving")
    public void testQuestionnaireSaving() {
        CreateQuestionnaireRequest createQuestionnaireRequest = CreateQuestionnaireRequest.builder()
                .experimentId(1L)
                .build();

        Assertions.assertEquals(mainController.createQuestionnaire(createQuestionnaireRequest), 1L);
    }

    @Test
    @DisplayName("Unsuccessful questionnaire saving")
    public void testQuestionnaireSavingWithErrors() {
        CreateQuestionnaireRequest createQuestionnaireRequest = CreateQuestionnaireRequest.builder()
                .build();

        Assertions.assertThrows(CreateQuestionnaireFailedException.class, () -> mainController.createQuestionnaire(createQuestionnaireRequest));
    }

}
