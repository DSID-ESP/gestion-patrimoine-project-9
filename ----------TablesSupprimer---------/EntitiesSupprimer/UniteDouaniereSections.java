package sn.douanes.EntitiesSupprimer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sn.douanes.entities.Sections;
import sn.douanes.entities.UniteDouaniere;

import javax.persistence.*;


@Entity
@IdClass(UniteDouaniereSectionsId.class)
//@Table(name = "unite_douaniere_sections")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UniteDouaniereSections {

    @Id
    @ManyToOne
    @JoinColumn(name = "code_unite_douaniere")
    private UniteDouaniere codeUniteDouaniere;

    @Id
    @ManyToOne
    @JoinColumn(name = "code_section")
    private Sections codeSection;

}
