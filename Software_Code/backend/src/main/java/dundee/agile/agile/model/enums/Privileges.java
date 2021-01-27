package dundee.agile.agile.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Privileges {
    PARTICIPANT(0),
    CO_RESEARCHER(1),
    RESEARCHER(2),
    LAB_MANAGER(3);

    private final int numericValue;
}
