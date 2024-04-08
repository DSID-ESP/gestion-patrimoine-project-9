package sn.douanes.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "FONCTION_AGENT")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FonctionAgent {

    @Id
    @Column(name = "CODE_FONCTION_AGENT", length = 10)
    private String codeFonctionAgent;
    

    @Column(name = "LIBELLE_FONCTION_AGENT",length = 100)
    private String libelleFonctionAgent;


}
