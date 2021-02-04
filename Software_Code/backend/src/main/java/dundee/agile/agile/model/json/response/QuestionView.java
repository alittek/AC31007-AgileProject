package dundee.agile.agile.model.json.response;

import dundee.agile.agile.model.enums.QuestionType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class QuestionView {
    private String title;
    private String description;
    private boolean required;
    private int type;
    private String[] answers;
}
