package sn.douanes.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "AGENT")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Agent {

    @Id
    @Column(name = "MATRICULE_AGENT", length = 7, nullable = false)
    private String matriculeAgent;

    @Column(name = "CODE_AGENT", length = 5, unique = true)
    private String codeAgent;


    @Column(name = "NOM_AGENT", length = 100)
    private String nomAgent;

    @Column(name = "EMAIL_AGENT", length = 100)
    private String emailAgent;

    @Column(name = "PRENOM_AGENT")
    private String prenomAgent;

    @ManyToOne
    @JoinColumn(name = "CODE_SECTION")
    private Sections codeSection;


    @ManyToOne
    @JoinColumn(name = "CODE_UNITE_DOUANIERE")
    private UniteDouaniere codeUniteDouaniere;


    @Column(name = "NUMERO_TELEPHONE_AGENT")
    private Integer numeroTelephoneAgent;

}
