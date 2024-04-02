package sn.douanes.services;

import org.springframework.transaction.annotation.Transactional;
import sn.douanes.entities.Authorities;
import sn.douanes.entities.SecteurActivite;
import sn.douanes.entities.Utilisateur;
import sn.douanes.exception.PrestatairesExistException;
import sn.douanes.exception.PrestatairesNotFoundException;
import sn.douanes.entities.Prestataires;

import java.util.List;
import java.util.Set;

public interface PrestatairesService {

    Prestataires savePrestataires(Prestataires p) throws PrestatairesExistException;
    Prestataires updatePrestataires(Prestataires p) throws PrestatairesNotFoundException;
    void deletePrestataires(Prestataires p);
    void deletePrestatairesById(String id);
    Prestataires getPrestatairesById(String id);
    List<Prestataires> getAllPrestataires();

    List<Prestataires> getAllPrestatairesWithSecteursActivite();

    Prestataires ajouterPrestatairesSecteur(Prestataires prestataires, Set<SecteurActivite> secteurActivites) throws PrestatairesExistException;


}
