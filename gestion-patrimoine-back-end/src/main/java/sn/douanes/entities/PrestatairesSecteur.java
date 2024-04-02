package sn.douanes.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sn.douanes.entities.keys.PrestatairesSecteurId;


@Entity
@IdClass(PrestatairesSecteurId.class)
@Table(name = "PRESTATAIRES_SECTEUR")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrestatairesSecteur {


    @Id
    @ManyToOne
    @JoinColumn(name = "NINEA", nullable = false)
    private Prestataires ninea;

    @Id
    @ManyToOne
    @JoinColumn(name = "CODE_SECTEUR_ACTIVITE", nullable = false)
    private SecteurActivite codeSecteurActivite;

}
