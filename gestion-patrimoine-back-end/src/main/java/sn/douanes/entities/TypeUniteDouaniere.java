package sn.douanes.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "TYPE_UNITE_DOUANIERE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TypeUniteDouaniere {

    @Id
    @Column(name = "CODE_TYPE_UNITE_DOUANIERE", length = 5, nullable = false)
    private String codeTypeUniteDouaniere;


    @Column(name = "LIBELLE_TYPE_UNITE_DOUANIERE", length = 100)
    private String libelleTypeUniteDouaniere;

}
