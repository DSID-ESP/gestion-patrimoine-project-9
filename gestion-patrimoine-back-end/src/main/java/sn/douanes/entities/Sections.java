package sn.douanes.entities;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "SECTIONS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sections {

    @Id
    @Column(name = "CODE_SECTION", length = 3, nullable = false)
    private String codeSection;

    @Column(name = "LIBELLE_SECTION", length = 100)
    private String libelleSection;

    @ManyToOne
    @JoinColumn(name = "CODE_UNITE_DOUANIERE")
    private UniteDouaniere codeUniteDouaniere;

}
