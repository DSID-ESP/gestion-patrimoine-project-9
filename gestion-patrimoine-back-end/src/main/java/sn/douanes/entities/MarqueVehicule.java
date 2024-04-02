package sn.douanes.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "MARQUE_VEHICULE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarqueVehicule {

    @Id
    @Column(name = "CODE_MARQUE_VH", length = 25, nullable = false)
    private String codeMarqueVH;

    @Column(name = "LIBELLE_MARQUE_VH", length = 100)
    private String libelleMarqueVH;

}