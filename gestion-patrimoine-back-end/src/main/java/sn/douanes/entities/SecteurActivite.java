package sn.douanes.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "SECTEUR_ACTIVITE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SecteurActivite {

    @Id
    @Column(name = "code_secteur_activite", length = 10, nullable = false)
    private String codeSecteurActivite;


    @Column(name = "LIBELLE_SECTEUR_ACTIVITE")
    private String libelleSecteurActivite;



}
