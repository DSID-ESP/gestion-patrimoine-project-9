package sn.douanes.EntitiesSupprimer;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
//@Table(name = "vidange")
public class Vidange {

    @Id
    @Column(name = "numero_immatriculation")
    private String numeroImmatriculation;

}