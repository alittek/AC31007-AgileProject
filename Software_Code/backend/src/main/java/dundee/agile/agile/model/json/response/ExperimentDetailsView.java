package dundee.agile.agile.model.json.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExperimentDetailsView {
    private Long researcherId;
    private String type;
    private String title;
    private String description;
}
