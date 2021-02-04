package dundee.agile.agile.model.json.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CreateQuestionnaireRequest {
    private Long experimentId;
    private String title;
    private String researcher;
    private String contact;
    private String description;
}
