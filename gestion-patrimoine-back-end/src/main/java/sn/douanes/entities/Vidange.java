package sn.douanes.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "VIDANGE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vidange {

    @Id
    @Column(name = "IDENTIFIANT_MAINTENANCE", length = 25, nullable = false)
    private String identifiantMaintenance;

    @Column(name = "LIBELLE_HUILE", length = 512)
    private String libelleHuile;

    @Column(name = "QUANTITE_MISE_VEHICULE")
    private int quantiteMiseVehicule;

}
