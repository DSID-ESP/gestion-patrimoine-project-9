package sn.douanes.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sn.douanes.entities.keys.ArticleBonPourId;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@IdClass(ArticleBonPourId.class)
@Table(name = "ARTICLE_BON_POUR")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleBonPour {

    @Id
    @Column(name = "CODE_ARTICLE_BON_POUR", nullable = false)
    private Integer codeArticleBonPour;

    @Id
    @Column(name = "IDENTIFIANT_BON_POUR", nullable = false)
    private String identifiantBonPour;


    @Column(name = "LIBELLE_ARTICLE_BON_POUR", length = 100)
    private String libelleArticleBonPour;

    @Column(name = "QUANTITE_DEMANDEE")
    private Integer quantiteDemandee;


    @ManyToOne
    @JoinColumn(name = "CODE_TYPE_OBJET")
    private TypeObjet codeTypeObjet;

    @ManyToOne
    @JoinColumn(name = "MATRICULE_AGENT")
    private Agent matriculeAgent;

}