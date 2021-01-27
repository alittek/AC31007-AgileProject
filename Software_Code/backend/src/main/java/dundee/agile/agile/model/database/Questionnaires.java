package dundee.agile.agile.model.database;

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
@Table(name = "questionnaires")
public class Questionnaires {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long questionnaireId;
    private Long id;//foreign key to implement when experiment table is created
}
