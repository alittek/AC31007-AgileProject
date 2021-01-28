package dundee.agile.agile.model.json.response;

import dundee.agile.agile.model.database.Experiment;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExperimentDetailsView {
    private Long researcherId;
    private String type;
    private String title;
    private String description;
    private boolean ethicallyApproved;

    public void setDetails(Experiment experiment) {
        this.setType(experiment.getType());
        this.setTitle(experiment.getTitle());
        this.setDescription(experiment.getDescription());
        this.setEthicallyApproved(experiment.isEthicallyApproved());
    }
}
