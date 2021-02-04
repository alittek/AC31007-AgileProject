package dundee.agile.agile.model.json.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateQuestionnaireRequest {
    private Long experimentId;
    private String title;
    private String researcher;
    private String contact;
    private String description;
}
