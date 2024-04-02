package sn.douanes.entities;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "TYPE_MATERIEL")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TypeMateriel {

    @Id
    @Column(name = "CODE_TYPE_MATERIEL", length = 25, nullable = false)
    private String codeTypeMateriel;


    @Column(name = "LIBELLE_TYPE_MATERIEL")
    private String libelleTypeMateriel;

}