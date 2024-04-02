package sn.douanes.EntitiesSupprimer;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
//@Table(name = "carburant")
public class Carburant {

    @Id
    @Column(name = "identifiant_carburant")
    private Long id;

}