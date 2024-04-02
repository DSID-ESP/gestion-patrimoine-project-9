package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.UniteDouaniere;
import sn.douanes.repositories.UniteDouaniereRepository;
import sn.douanes.services.UniteDouaniereService;

import java.util.List;


@Service
public class UniteDouaniereServiceImpl implements UniteDouaniereService {

    @Autowired
    UniteDouaniereRepository uniteDouaniereRepository;

    @Override
    public UniteDouaniere saveUniteDouaniere(UniteDouaniere u) {
        return uniteDouaniereRepository.save(u);
    }

    @Override
    public UniteDouaniere updateUniteDouaniere(UniteDouaniere u) {
        return uniteDouaniereRepository.save(u);
    }

    @Override
    public void deleteUniteDouaniere(UniteDouaniere u) {
        uniteDouaniereRepository.delete(u);
    }

    @Override
    public void deleteUniteDouaniereById(String id) {
        uniteDouaniereRepository.deleteById(id);
    }

    @Override
    public UniteDouaniere getUniteDouaniereById(String id) {
        return uniteDouaniereRepository.findById(id).isPresent() ? uniteDouaniereRepository.findById(id).get() : null;
    }

    @Override
    public List<UniteDouaniere> getAllUniteDouanieres() {
        return uniteDouaniereRepository.findAll();
    }


//    @Override
//    public UniteDouaniere ajouterUniteDouaniere(
//            String codeUniteDouaniere,
//            String nomUniteDouaniere,
//            Integer effectifUniteDouaniere,
//            Integer nombreArme,
//            Integer nombreAutomobile,
//            Integer nombreMateriel,
//            TypeUniteDouaniere codeTypeUniteDouaniere
//    ) {
//
//        UniteDouaniere uniteDouaniere = new UniteDouaniere();
//
//        uniteDouaniere.setCodeUniteDouaniere(codeUniteDouaniere);
//        uniteDouaniere.setNomUniteDouaniere(nomUniteDouaniere);
//        uniteDouaniere.setEffectifUniteDouaniere(effectifUniteDouaniere);
//        uniteDouaniere.setNombreArme(nombreArme);
//        uniteDouaniere.setNombreAutomobile(nombreAutomobile);
//        uniteDouaniere.setNombreMateriel(nombreMateriel);
//        uniteDouaniere.setCodeTypeUniteDouaniere(codeTypeUniteDouaniere);
//
//
//        return uniteDouaniereRepository.save(uniteDouaniere);
//    }



}
