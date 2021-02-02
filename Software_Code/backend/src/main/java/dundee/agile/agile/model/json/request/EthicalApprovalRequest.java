package dundee.agile.agile.model.json.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class EthicalApprovalRequest {
    private boolean ethicallyApproved;
    private Long experimentId;
    private String code;
}
