package sn.douanes.EntitiesSupprimer;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
//@Table(name = "unite_hierarchique")
public class UniteHierarchique {

    @Id
    @Column(name = "code_unite_hierarchique")
    private String codeUniteHierarchique;


    @Column(name = "libelle_unite_hierarchique")
    private String libelleUniteHierarchique;

    @Column(name = "sigle_unite_hierarchique")
    private String sigleUniteHierarchique;

}