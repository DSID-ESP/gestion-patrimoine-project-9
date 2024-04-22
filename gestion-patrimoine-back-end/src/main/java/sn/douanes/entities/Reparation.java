package sn.douanes.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "REPARATION")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reparation {

    @Id
    @Column(name = "IDENTIFIANT_MAINTENANCE", length = 25, nullable = false)
    private String identifiantMaintenance;

    @Column(name = "NATURE_REPARATION", length = 512)
    private String natureReparation;

//    @Column(name = "SUITE_ACCIDENT")
//    private Boolean suiteAccident;


}
