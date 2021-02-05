package dundee.agile.agile.model.json.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class QuestionnaireView {
    private String title;
    private String researcher;
    private String contact;
    private String description;
    private Long experimentId;
}
