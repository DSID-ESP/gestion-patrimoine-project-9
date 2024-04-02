package sn.douanes.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Table(name = "TYPE_VEHICULE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TypeVehicule {

    @Id
    @Column(name = "CODE_TYPE_VEHICULE", length = 20, nullable = false)
    private String codeTypeVehicule;

    @Column(name = "LIBELLE_TYPE_VEHICULE", length = 20)
    private String libelleTypeVehicule;

}