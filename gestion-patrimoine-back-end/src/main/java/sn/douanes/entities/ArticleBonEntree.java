package sn.douanes.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sn.douanes.entities.keys.ArticleBonEntreeId;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import java.sql.Timestamp;


@Entity
@IdClass(ArticleBonEntreeId.class)
@Table(name = "ARTICLE_BON_ENTREE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArticleBonEntree {

    @Id
    @Column(name = "CODE_ARTICLE_BON_ENTREE", nullable = false)
    private Integer codeArticleBonEntree;

    @Id
    @Column(name = "IDENTIFIANT_B_E", nullable = false)
    private String identifiantBE;


    @Column(name = "LIBELLE_ARTICLE_BON_ENTREE")
    private String libelleArticleBonEntree;


    @ManyToOne
    @JoinColumn(name = "CODE_LIEU_VH")
    private LieuStockageVehicule codeLieuVH;

    @Column(name = "QUANTITE_ENTREE")
    private Integer quantiteEntree;

    @ManyToOne
    @JoinColumn(name = "CODE_TYPE_OBJET")
    private TypeObjet codeTypeObjet;

    @ManyToOne
    @JoinColumn(name = "MATRICULE_AGENT")
    private Agent matriculeAgent;

    @Column(name = "DATE_ENREGISTREMENT")
    private Timestamp dateEnregistrement;


}