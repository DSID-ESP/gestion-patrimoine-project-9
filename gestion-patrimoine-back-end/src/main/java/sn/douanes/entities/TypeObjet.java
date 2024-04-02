package sn.douanes.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "TYPE_OBJET")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TypeObjet {

    @Id
    @Column(name = "CODE_TYPE_OBJET", length = 5, nullable = false)
    private String codeTypeObjet;

    @Column(name = "LIBELLE_TYPE_OBJET", length = 100)
    private String libelleTypeObjet;

    @OneToOne
    @JoinColumn(name = "CODE_SECTION")
    private Sections codeSection;

}