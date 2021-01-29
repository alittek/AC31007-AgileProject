package dundee.agile.agile.model.json.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateQuestionnaireRequest {
    private Long questionnaireID;
    private String question;
    private String answer;
}
