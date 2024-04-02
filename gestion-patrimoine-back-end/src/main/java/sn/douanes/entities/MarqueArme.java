package sn.douanes.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "MARQUE_ARME")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarqueArme {


    @Id
    @Column(name = "CODE_MARQUE_ARME", length = 10, nullable = false)
    private String codeMarqueArme;


    @Column(name = "LIBELLE_MARQUE_ARME", length = 100)
    private String libelleMarqueArme;

}