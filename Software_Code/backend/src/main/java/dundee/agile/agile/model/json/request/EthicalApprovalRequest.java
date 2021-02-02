package dundee.agile.agile.model.json.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EthicalApprovalRequest {
    private boolean ethicallyApproved;
    private Long experimentId;
    private String code;
}
