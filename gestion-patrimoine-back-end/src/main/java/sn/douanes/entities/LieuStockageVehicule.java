package sn.douanes.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "LIEU_STOCKAGE_VEHICULE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LieuStockageVehicule {

    @Id
    @Column(name = "CODE_LIEU_VH", length = 3, nullable = false)
    private String codeLieuVH;

    @Column(name = "LIBELLLE_LIEU_VH", length = 100)
    private String libellleLieuVH;

    @Column(name = "NOMBRE_LIMITE_STOCKAGE_VH")
    private Integer nombreLimiteStockageVH;


}
