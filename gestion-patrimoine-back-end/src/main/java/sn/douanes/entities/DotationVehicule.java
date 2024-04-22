package sn.douanes.entities;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.OneToOne;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "dotation_vehicule")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DotationVehicule {


    @Id
    @Column(name = "IDENTIFIANT_D_V", length = 25, nullable = false)
    private String identifiantDV;

    @OneToOne
    @JoinColumn(name = "NUMERO_SERIE")
    private Vehicule numeroSerie;


    @Column(name = "DATE_DOTATION")
    private Date dateDotation;


    @ManyToOne
    @JoinColumn(name = "matricule_agent")
    private Agent matriculeAgent;


    @OneToOne
    @JoinColumns({
            @JoinColumn(name = "IDENTIFIANT_BON_SORTIE", referencedColumnName = "IDENTIFIANT_BON_SORTIE"),
            @JoinColumn(name = "CODE_ARTICLE_BON_SORTIE", referencedColumnName = "CODE_ARTICLE_BON_SORTIE")
    })
    private ArticleBonSortie codeArticleBonSortie;


}