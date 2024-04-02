package sn.douanes.EntitiesSupprimer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sn.douanes.entities.DotationVehicule;
import sn.douanes.entities.Vehicule;

import javax.persistence.*;

@Entity
@IdClass(DotationVehiculeVehiculeId.class)
//@Table(name = "dotation_vehicule_vehicule")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class DotationVehiculeVehicule {

    @Id
    @ManyToOne
    @JoinColumn(name = "numero_serie")
    private Vehicule numeroSerie;

    @Id
    @ManyToOne
    @JoinColumn(name = "identifiant_d_v")
    private DotationVehicule identifiantDV;

}
