package sn.douanes.services;

import sn.douanes.entities.Fonctions;

import java.util.List;

public interface FonctionService {

    Fonctions saveFonctions(Fonctions f);
    Fonctions updateFonctions(Fonctions f);

    void deleteFonctionsById(String id);
    Fonctions getFonctionsById(String id);
    List<Fonctions> getAllFonctions();


}
