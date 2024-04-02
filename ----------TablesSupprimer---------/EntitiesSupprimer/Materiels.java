package sn.douanes.EntitiesSupprimer;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
//@Table(name = "materiels")
public class Materiels {

    @Id
    @Column(name = "identifiant_materiels")
    private Long id;

}