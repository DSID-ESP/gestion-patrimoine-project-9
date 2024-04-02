package sn.douanes.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinTable;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "PRESTATAIRES")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Prestataires {

    @Id
    @Column(name = "NINEA", length = 20, nullable = false)
    private String ninea;

    @Column(name = "ADRESSE_EMAIL", length = 100)
    private String adresseEmail;

    @Column(name = "NUMERO_TELEPHONE")
    private Integer numeroTelephone;

    @Column(name = "ADRESSE", length = 512)
    private String adresse;

    @Column(name = "RAISON_SOCIALE", length = 512)
    private String raisonSociale;



//    @OneToMany(mappedBy = "code_secteur_activite", fetch = FetchType.LAZY)
//    private Set<SecteurActivite> codeSecteurActivite;


//    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
//    @JoinTable(
//            name = "prestataires_secteur",
//            joinColumns = @JoinColumn(name = "ninea"),
//            inverseJoinColumns = @JoinColumn(name = "code_secteur_activite")
//    )
//    private Set<SecteurActivite> secteurActivite = new HashSet<>();


    @ManyToMany
    @JoinTable(
            name = "prestataires_secteur",
            joinColumns = @JoinColumn(name = "ninea"),
            inverseJoinColumns = @JoinColumn(name = "code_secteur_activite")
    )
    private Set<SecteurActivite> secteurActivite = new HashSet<>();

}
