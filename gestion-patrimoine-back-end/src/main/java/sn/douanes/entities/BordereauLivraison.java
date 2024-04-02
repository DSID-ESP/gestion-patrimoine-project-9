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
@Table(name = "BORDEREAU_LIVRAISON")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BordereauLivraison {

    @Id
    @Column(name = "IDENTIFIANT_B_L", length = 25, nullable = false)
    private String identifiantBL;


    @Column(name = "NUMERO_B_L", length = 100, unique = true)
    private String numeroBL;


    @Column(name = "DATE_B_L")
    private Date dateBL;

    @Column(name = "DESCRIPTION_B_L", length = 512)
    private String descriptionBL;

    @Column(name = "LIEU_DE_LIVRAISON")
    private String lieuDeLivraison;

    @Column(name = "REPRESENTANT_PRESTATAIRE")
    private String representantPrestataire;

    @ManyToOne
    @JoinColumn(name = "CODE_SECTION")
    private Sections codeSection;


    @Column(name = "CONFORMITE_B_L", length = 3)
    private String conformiteBL;

    @ManyToOne
    @JoinColumn(name = "MATRICULE_AGENT")
    private Agent matriculeAgent;

    @Column(name = "DATE_ENREGISTREMENT")
    private Timestamp dateEnregistrement;

    @ManyToOne
    @JoinColumn(name = "NINEA")
    private Prestataires ninea;



}