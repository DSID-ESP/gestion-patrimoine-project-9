package sn.douanes.services;

import sn.douanes.entities.Prestataires;
import sn.douanes.entities.PrestatairesSecteur;
import sn.douanes.entities.SecteurActivite;

import java.util.List;

public interface PrestatairesSecteurService {

    PrestatairesSecteur savePrestatairesSecteur(PrestatairesSecteur p);
    PrestatairesSecteur updatePrestatairesSecteur(PrestatairesSecteur p);
    void deletePrestatairesSecteur(PrestatairesSecteur p);
    void deletePrestatairesSecteurById(Prestataires ninea, SecteurActivite codeSecteurActivite);
    PrestatairesSecteur getPrestatairesSecteurById(Prestataires ninea, SecteurActivite codeSecteurActivite);
    List<PrestatairesSecteur> getAllPrestatairesSecteur();


}
