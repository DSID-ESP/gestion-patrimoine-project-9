package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.SecteurActivite;
import sn.douanes.repositories.SecteurActiviteRepository;
import sn.douanes.services.SecteurActiviteService;

import java.util.List;


@Service
public class SecteurActiviteServiceImpl implements SecteurActiviteService {

    @Autowired
    SecteurActiviteRepository secteurActiviteRepository;

    @Override
    public SecteurActivite saveSecteurActivite(SecteurActivite s) {
        return secteurActiviteRepository.save(s);
    }

    @Override
    public SecteurActivite updateSecteurActivite(SecteurActivite p) {
        return secteurActiviteRepository.save(p);
    }

    @Override
    public void deleteSecteurActivite(SecteurActivite p) {
        secteurActiviteRepository.delete(p);
    }

    @Override
    public void deleteSecteurActiviteById(String id) {
        secteurActiviteRepository.deleteById(id);
    }

    @Override
    public SecteurActivite getSecteurActiviteById(String id) {
        return secteurActiviteRepository.findById(id).isPresent() ? secteurActiviteRepository.findById(id).get() : null;
    }

    @Override
    public List<SecteurActivite> getAllSecteurActivites() {
        return secteurActiviteRepository.findAll();
    }


//    @Override
//    public SecteurActivite ajouterSecteurActivite(
//            String codeSecteurActivite,
//            String libelleSecteurActivite
//    ) {
//
//        SecteurActivite secteurActivite = new SecteurActivite();
//
//        secteurActivite.setCodeSecteurActivite(codeSecteurActivite);
//        secteurActivite.setLibelleSecteurActivite(libelleSecteurActivite);
//
//        return secteurActiviteRepository.save(secteurActivite);
//    }




}
