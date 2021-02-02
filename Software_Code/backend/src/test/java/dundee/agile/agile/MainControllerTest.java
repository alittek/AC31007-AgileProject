package dundee.agile.agile;

import dundee.agile.agile.controllers.MainController;
import dundee.agile.agile.exceptions.EthicalApprovalCodeException;
import dundee.agile.agile.model.json.request.EthicalApprovalRequest;
import dundee.agile.agile.repositories.ExperimentsRepository;
import dundee.agile.agile.repositories.UserExperimentRepository;
import dundee.agile.agile.repositories.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

@DataJpaTest
public class MainControllerTest {

    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private ExperimentsRepository experimentsRepository;
    @Autowired
    private UserExperimentRepository userExperimentRepository;
    
    private MainController mainController;

    @BeforeEach
    public void setUp() {
        mainController = new MainController(usersRepository, experimentsRepository, userExperimentRepository);
    }

    @Test
    @DisplayName("Ethical approval fake experiment id")
    public void testEthicalApprovalWithFakeExperimentId() {
        EthicalApprovalRequest ethicalApprovalRequest = EthicalApprovalRequest.builder()
                .ethicallyApproved(true)
                .experimentId(-1L)
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
