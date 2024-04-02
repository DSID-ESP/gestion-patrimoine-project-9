package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.exception.PrestatairesExistException;
import sn.douanes.exception.PrestatairesNotFoundException;
import sn.douanes.entities.BordereauLivraison;
import sn.douanes.entities.Prestataires;
import sn.douanes.entities.SecteurActivite;
import sn.douanes.repositories.BordereauLivraisonRepository;
import sn.douanes.repositories.PrestatairesRepository;
import sn.douanes.services.PrestatairesService;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static sn.douanes.constants.ApplicationConstants.PRESTATAIRES_ALREADY_EXISTS;

@Service
public class PrestatairesServiceImpl implements PrestatairesService {

    @Autowired
    PrestatairesRepository prestatairesRepository;

    @Autowired
    BordereauLivraisonRepository bordereauLivraisonRepository;

    @Override
    public Prestataires savePrestataires(Prestataires p) throws PrestatairesExistException {
        Prestataires prestataires = getPrestatairesById(p.getNinea());

        if(prestataires != null) {
            throw new PrestatairesExistException(PRESTATAIRES_ALREADY_EXISTS);
        } else {
            return prestatairesRepository.save(p);
        }

    }

    @Override
    public Prestataires updatePrestataires(Prestataires p) throws PrestatairesNotFoundException {
        return prestatairesRepository.save(p);
    }

    @Override
    public void deletePrestataires(Prestataires p) {
        prestatairesRepository.delete(p);
    }

    @Override
    public void deletePrestatairesById(String id) {

        Prestataires prestataires = getPrestatairesById(id);
        List<BordereauLivraison> bordereaux = bordereauLivraisonRepository.findAllByNinea(prestataires);

        for (BordereauLivraison bordereau : bordereaux) {
            bordereau.setNinea(null);
            bordereauLivraisonRepository.save(bordereau);
        }

        prestatairesRepository.deleteById(id);
    }
    

    @Override
    public Prestataires getPrestatairesById(String id) {
        return prestatairesRepository.findById(id).isPresent() ? prestatairesRepository.findById(id).get() : null;
    }

    @Override
    public List<Prestataires> getAllPrestataires() {
        return prestatairesRepository.findAll();
    }


    @Override
    public Prestataires ajouterPrestatairesSecteur(
            Prestataires prestataires,
            Set<SecteurActivite> secteurActivite
    ) throws PrestatairesExistException {

        Prestataires prestatairesExiste = getPrestatairesById(prestataires.getNinea());

        if(null != prestatairesExiste) {
            throw new PrestatairesExistException(PRESTATAIRES_ALREADY_EXISTS);
        } else {
            return prestatairesRepository.save(prestataires);
        }

    }

    @Override
    public List<Prestataires> getAllPrestatairesWithSecteursActivite() {
        return prestatairesRepository.findAllWithSecteursActivite();
    }


}
