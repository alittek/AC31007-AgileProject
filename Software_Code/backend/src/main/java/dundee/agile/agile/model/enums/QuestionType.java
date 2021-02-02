package dundee.agile.agile.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum QuestionType {
    OPEN(0),
    MULTIPLE_CHOICE(1),
    SYSTEM_USABILITY_SCALE(2);

    private final int numericValue;
}
