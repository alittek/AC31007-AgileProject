package dundee.agile.agile.model.json.request;

import dundee.agile.agile.model.enums.QuestionType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CreateQuestionRequest {
    private Long questionnaireId;
    private String title;
    private String description;
    private boolean required;
    private QuestionType type;
    private String[] answers;
    private int systemUsabilityScale;
}
