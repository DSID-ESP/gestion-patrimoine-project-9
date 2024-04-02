package sn.douanes.EntitiesSupprimer;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
//@Table(name = "maintenance")
public class Maintenance {

    @Id
    @Column(name = "identifiant_maintenance")
    private Long id;

}