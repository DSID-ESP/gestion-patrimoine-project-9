package sn.douanes.entities;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "TYPE_ARME")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TypeArme {

    @Id
    @Column(name = "CODE_TYPE_ARME", length = 25, nullable = false)
    private String codeTypeArme;


    @Column(name = "LIBELLE_TYPE_ARME")
    private String libelleTypeArme;

}