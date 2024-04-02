package sn.douanes.EntitiesSupprimer;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
//@Table(name = "fournisseurs")
public class Fournisseurs {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    // @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "code_fournisseur", nullable = false, updatable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String codeFournisseur;


    @Column(name = "raison_sociale")
    private String raisonSociale;

    @Column(name = "numero_telephone")
    private Integer numeroTelephone;

    @Column(name = "n_i_n_e_a")
    private String ninea;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "secteur_activite")
    private String secteurActivite;


}