package sn.douanes.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "UNITE_DOUANIERE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UniteDouaniere {

    @Id
    @Column(name = "CODE_UNITE_DOUANIERE", length = 3, nullable = false)
    private String codeUniteDouaniere;


    @Column(name = "NOM_UNITE_DOUANIERE")
    private String nomUniteDouaniere;

    @Column(name = "EFFECTIF_UNITE_DOUANIERE")
    private Integer effectifUniteDouaniere;

    @Column(name = "NOMBRE_ARME")
    private Integer nombreArme;

    @Column(name = "NOMBRE_AUTOMOBILE")
    private Integer nombreAutomobile;

    @Column(name = "NOMBRE_MATERIEL")
    private Integer nombreMateriel;


    @ManyToOne
    @JoinColumn(name = "CODE_TYPE_UNITE_DOUANIERE")
    private TypeUniteDouaniere codeTypeUniteDouaniere;


}