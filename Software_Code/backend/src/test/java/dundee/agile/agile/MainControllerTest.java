package dundee.agile.agile;

import dundee.agile.agile.controllers.MainController;
import dundee.agile.agile.exceptions.EthicalApprovalCodeException;
import dundee.agile.agile.model.database.Experiment;
import dundee.agile.agile.model.json.request.EthicalApprovalRequest;
import dundee.agile.agile.repositories.ExperimentsRepository;
import dundee.agile.agile.repositories.UserExperimentRepository;
import dundee.agile.agile.repositories.UsersRepository;
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

        mainController = new MainController(usersRepository, experimentsRepository, userExperimentRepository);
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

}