package sn.douanes.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "MAINTENANCE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Maintenance {


    @Id
    @Column(name = "IDENTIFIANT_MAINTENANCE", length = 25, nullable = false)
    private String identifiantMaintenance;


    @ManyToOne
    @JoinColumn(name = "NUMERO_SERIE")
    private Vehicule numeroSerie;

    @Column(name = "ETAT_MAINTENANCE")
    private String etatMaintenance;

    @Column(name = "DATE_DEBUT_MAINTENANCE")
    private Timestamp dateDebutMaintenance;

    @Column(name = "DATE_FIN_MAINTENANCE")
    private Timestamp dateFinMaintenance;


    @Column(name = "TYPE_MAINTENANCE", length = 15)
    private String typeMaintenance;


    @Column(name = "OBSERVATION_MAINTENANCE", length = 512)
    private String observationMaintenance;


}
