package sn.douanes.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pays")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pays {

    @Id
    @Column(name = "CODE_PAYS", length = 3, nullable = false)
    private String codePays;

    @Column(name = "LIBELLE_PAYS", length = 100)
    private String libellePays;

}
