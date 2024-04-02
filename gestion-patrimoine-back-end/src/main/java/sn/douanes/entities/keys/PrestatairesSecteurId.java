package sn.douanes.entities.keys;


import sn.douanes.entities.Prestataires;
import sn.douanes.entities.SecteurActivite;

import java.io.Serializable;

public class PrestatairesSecteurId implements Serializable {

    private Prestataires ninea;
    private SecteurActivite codeSecteurActivite;


    public PrestatairesSecteurId() {
    }

    public PrestatairesSecteurId(Prestataires ninea, SecteurActivite codeSecteurActivite) {
        this.ninea = ninea;
        this.codeSecteurActivite = codeSecteurActivite;
    }

}
