package sn.douanes.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "VIDANGE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vidange {

    @Id
    @Column(name = "IDENTIFIANT_MAINTENANCE", length = 25, nullable = false)
    private String identifiantMaintenance;

    @ManyToOne
    @JoinColumn(name = "IDENTIFIANT_HUILE")
    private Huile identifiantHuile;

    @Column(name = "QUANTITE")
    private int quantite;

}
