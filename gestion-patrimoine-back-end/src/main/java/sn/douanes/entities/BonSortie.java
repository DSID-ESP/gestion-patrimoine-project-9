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


import java.sql.Date;


@Entity
@Table(name = "BON_SORTIE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BonSortie {

    @Id
    @Column(name = "IDENTIFIANT_BON_SORTIE", nullable = false)
    private String identifiantBonSortie;

    @Column(name = "NUMERO_BON_SORTIE")
    private String numeroBonSortie;

    @Column(name = "DESCRIPTION_BON_SORTIE")
    private String descriptionBonSortie;

    @Column(name = "DATE_BON_SORTIE")
    private Date dateBonSortie;

    @ManyToOne
    @JoinColumn(name = "MATRICULE_AGENT")
    private Agent matriculeAgent;

    @ManyToOne
    @JoinColumn(name = "IDENTIFIANT_BON_POUR")
    private BonPour identifiantBonPour;




}