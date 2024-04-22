package sn.douanes.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "HUILE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Huile {

    @Id
    @Column(name = "IDENTIFIANT_HUILE", length = 25, nullable = false)
    private String identifiantHuile;

    @Column(name = "LIBELLE_HUILE", length = 512)
    private String libelleHuile;

}
