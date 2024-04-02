package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.Fonctions;
import sn.douanes.repositories.FonctionsRepository;
import sn.douanes.services.FonctionService;

import java.util.List;


@Service
public class FonctionServiceImpl implements FonctionService {

    @Autowired
    FonctionsRepository fonctionRepository;

    @Override
    public Fonctions saveFonctions(Fonctions f) {
        return fonctionRepository.save(f);
    }

    @Override
    public Fonctions updateFonctions(Fonctions f) {
        return fonctionRepository.save(f);
    }


    @Override
    public void deleteFonctionsById(String id) {
        fonctionRepository.deleteById(id);
    }

    @Override
    public Fonctions getFonctionsById(String id) {
        return fonctionRepository.findById(id).isPresent() ? fonctionRepository.findById(id).get() : null;
    }

    @Override
    public List<Fonctions> getAllFonctions() {
        return fonctionRepository.findAll();
    }


}
