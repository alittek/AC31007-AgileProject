package dundee.agile.agile.model.json.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateExperimentRequest {
    private Long researcherId;
    private String type;
    private String title;
    private String description;
}
