package sn.douanes.EntitiesSupprimer;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
//@Table(name = "changement_piece")
public class ChangementPiece {

    @Id
    @Column(name = "identifiant_changement_piece")
    private Long id;

}