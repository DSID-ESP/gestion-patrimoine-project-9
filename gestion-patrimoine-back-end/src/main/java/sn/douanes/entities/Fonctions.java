package sn.douanes.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Table(name = "FONCTIONS")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Fonctions {

    @Id
    @Column(name = "CODE_FONCTION", length = 25)
    private String codeFonction;
    

    @Column(name = "LIBELLE_FONCTION",length = 100)
    private String libelleFonction;


}
