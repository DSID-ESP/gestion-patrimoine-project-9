package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.TypeUniteDouaniere;
import sn.douanes.repositories.TypeUniteDouaniereRepository;
import sn.douanes.services.TypeUniteDouaniereService;

import java.util.List;


@Service
public class TypeUniteDouaniereServiceImpl implements TypeUniteDouaniereService {

    @Autowired
    TypeUniteDouaniereRepository typeUniteDouaniereRepository;

    @Override
    public TypeUniteDouaniere saveTypeUniteDouaniere(TypeUniteDouaniere t) {
        return typeUniteDouaniereRepository.save(t);
    }

    @Override
    public TypeUniteDouaniere updateTypeUniteDouaniere(TypeUniteDouaniere t) {
        return typeUniteDouaniereRepository.save(t);
    }

    @Override
    public void deleteTypeUniteDouaniere(TypeUniteDouaniere t) {
        typeUniteDouaniereRepository.delete(t);
    }

    @Override
    public void deleteTypeUniteDouaniereById(String id) {
        typeUniteDouaniereRepository.deleteById(id);
    }

    @Override
    public TypeUniteDouaniere getTypeUniteDouaniereById(String id) {
        return typeUniteDouaniereRepository.findById(id).isPresent() ? typeUniteDouaniereRepository.findById(id).get() : null;
    }

    @Override
    public List<TypeUniteDouaniere> getAllTypeUniteDouanieres() {
        return typeUniteDouaniereRepository.findAll();
    }


//    @Override
//    public TypeUniteDouaniere ajouterTypeUniteDouaniere(
//            String codeTypeUniteDouaniere,
//            String libelleTypeUniteDouaniere
//    ) {
//
//        TypeUniteDouaniere typeUniteDouaniere = new TypeUniteDouaniere();
//
//        typeUniteDouaniere.setCodeTypeUniteDouaniere(codeTypeUniteDouaniere);
//        typeUniteDouaniere.setLibelleTypeUniteDouaniere(codeTypeUniteDouaniere);
//
//        return typeUniteDouaniereRepository.save(typeUniteDouaniere);
//    }


}
