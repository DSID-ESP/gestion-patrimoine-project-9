package sn.douanes.entities;


import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "BON_POUR")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BonPour {

    @Id
    @Column(name = "IDENTIFIANT_BON_POUR", length = 25, nullable = false)
    private String identifiantBonPour;

    @Column(name = "DESCRIPTION_BON_POUR")
    private String descriptionBonPour;

    @Column(name = "ETAT_Bon_Pour", length = 25)
    private String etatBonPour;

    @ManyToOne
    @JoinColumn(name = "CODE_SECTION")
    private Sections codeSection;

    @ManyToOne
    @JoinColumn(name = "CODE_UNITE_DOUANIERE")
    private UniteDouaniere codeUniteDouaniere;


    @Column(name = "NUMERO_COURRIEL_ORIGINE")
    private Integer numeroCourrielOrigine;

    @Column(name = "DATE_COURRIEL_ORIGINE")
    private Date dateCourrielOrigine;


    @Column(name = "OBJECT_COURRIEL_ORIGINE")
    private String objectCourrielOrigine;

    @ManyToOne
    @JoinColumn(name = "MATRICULE_AGENT")
    private Agent matriculeAgent;


    @Column(name = "DATE_ENREGISTREMENT")
    private Timestamp dateEnregistrement;

    @Column(name = "NUMERO_ARRIVE_B_L_M")
    private Integer numeroArriveBLM;

    @Column(name = "NUMERO_ARRIVE_D_L_F")
    private Integer numeroArriveDLF;

    @Column(name = "NUMERO_ARRIVE_SECTION")
    private Integer numeroArriveSection;

    @Column(name = "DATE_ARRIVE_B_L_M")
    private Date dateArriveBLM;

    @Column(name = "DATE_ARRIVE_D_L_F")
    private Date dateArriveDLF;

    @Column(name = "DATE_ARRIVE_SECTION")
    private Date dateArriveSection;

    @Column(name = "OBSERVATION_B_L_M")
    private String observationBLM;

    @Column(name = "OBSERVATION_D_L_F")
    private String observationDLF;

    @Column(name = "OBSERVATION_SECTION")
    private String observationSection;



}