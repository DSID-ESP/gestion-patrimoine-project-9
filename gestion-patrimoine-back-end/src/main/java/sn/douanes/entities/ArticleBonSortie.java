package sn.douanes.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sn.douanes.entities.keys.ArticleBonSortieId;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import java.sql.Date;

@Entity
@IdClass(ArticleBonSortieId.class)
@Table(name = "ARTICLE_BON_SORTIE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleBonSortie {

    @Id
    @Column(name = "CODE_ARTICLE_BON_SORTIE", nullable = false)
    private Integer codeArticleBonSortie;

    @Id
    @Column(name = "IDENTIFIANT_BON_SORTIE", nullable = false)
    private String identifiantBonSortie;


    @Column(name = "LIBELLE_ARTICLE_BON_SORTIE", length = 100)
    private String LibelleArticleBonSortie;

    @Column(name = "DATE_ARTICLE_BON_SORTIE")
    private Date dateArticleBonSortie;

    @Column(name = "QUANTITE_ACCORDEE")
    private Integer quantiteAccordee;


    @ManyToOne
    @JoinColumn(name = "MATRICULE_AGENT")
    private Agent matriculeAgent;

}