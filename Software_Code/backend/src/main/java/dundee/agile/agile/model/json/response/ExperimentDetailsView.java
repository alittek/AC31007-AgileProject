package dundee.agile.agile.model.json.response;

import dundee.agile.agile.model.database.Experiment;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExperimentDetailsView {
    private Long id;
    private Long researcherId;
    private String type;
    private String title;
    private String description;
    private boolean ethicallyApproved;
    private String ethicalApprovalCode;

    public void setDetails(Experiment experiment) {
        this.setId(experiment.getId());
        this.setType(experiment.getType());
        this.setTitle(experiment.getTitle());
        this.setDescription(experiment.getDescription());
        this.setEthicallyApproved(experiment.isEthicallyApproved());
        this.setEthicalApprovalCode(experiment.getEthicalApprovalCode());
    }
}
