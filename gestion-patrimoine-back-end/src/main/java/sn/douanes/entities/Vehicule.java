package sn.douanes.entities;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "VEHICULE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicule {

    @Id
    @Column(name = "NUMERO_SERIE", length = 30, nullable = false)
    private String numeroSerie;


    @Column(name = "NUMERO_IMMATRICULATION", length = 20)
    private String numeroImmatriculation;


    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "IDENTIFIANT_B_E", referencedColumnName = "IDENTIFIANT_B_E"),
            @JoinColumn(name = "CODE_ARTICLE_BON_ENTREE", referencedColumnName = "CODE_ARTICLE_BON_ENTREE")
    })
    private ArticleBonEntree codeArticleBonEntree;


    @ManyToOne
    @JoinColumn(name = "CODE_MARQUE")
    private MarqueVehicule codeMarque;


    @ManyToOne
    @JoinColumn(name = "CODE_TYPE_ENERGIE")
    private TypeEnergie codeTypeEnergie;


    @Column(name = "NUMERO_CARTE_GRISE", length = 30)
    private String numeroCarteGrise;


    @ManyToOne
    @JoinColumn(name = "CODE_TYPE_VEHICULE")
    private TypeVehicule codeTypeVehicule;


    @Column(name = "MODELE", length = 50)
    private String modele;

    @Column(name = "LIBELLE_ETAT_VEHICULE", length = 10)
    private String libelleEtatVehicule;


    @ManyToOne
    @JoinColumn(name = "CODE_PAYS")
    private Pays codePays;


    @Column(name = "DATE_MISE_EN_CIRCULATION")
    private Date dateMiseEnCirculation;



}
