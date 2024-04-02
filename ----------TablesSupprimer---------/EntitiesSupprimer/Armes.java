package sn.douanes.EntitiesSupprimer;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
//@Table(name = "armes")
public class Armes {

    @Id
    @Column(name = "identifiant_armes")
    private Long id;

}