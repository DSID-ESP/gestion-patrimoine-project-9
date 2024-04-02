package sn.douanes.EntitiesSupprimer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;


@Entity
//@Table(name = "etat_vehicule")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EtatVehicule {

    @Id
    @Column(name = "code_etat", length = 10)
    private String codeEtat;

    @Column(name = "libelle_etat", length = 10)
    private String libelleEtat;

}