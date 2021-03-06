package dundee.agile.agile.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum QuestionType {
    OPEN(0),
    CHECKBOX(1),
    RADIO(2),
    SYSTEM_USABILITY_SCALE(3);

    private final int numericValue;
}
