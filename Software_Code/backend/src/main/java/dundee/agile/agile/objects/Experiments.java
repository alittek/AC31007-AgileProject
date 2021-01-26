package dundee.agile.agile.objects;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "experiments")
public class Experiments {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long experimentId;
    private Long id;
    private String title;
    private String description;
    private Long results;
}
