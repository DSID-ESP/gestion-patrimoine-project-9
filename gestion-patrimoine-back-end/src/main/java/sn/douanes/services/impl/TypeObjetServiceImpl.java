package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.Sections;
import sn.douanes.entities.TypeObjet;
import sn.douanes.repositories.TypeObjetRepository;
import sn.douanes.services.TypeObjetService;

import java.util.List;


@Service
public class TypeObjetServiceImpl implements TypeObjetService {

    @Autowired
    TypeObjetRepository typeObjetRepository;

    @Override
    public TypeObjet saveTypeObjet(TypeObjet t) {
        return typeObjetRepository.save(t);
    }

    @Override
    public TypeObjet updateTypeObjet(TypeObjet t) {
        return typeObjetRepository.save(t);
    }

    @Override
    public void deleteTypeObjet(TypeObjet t) {
        typeObjetRepository.delete(t);
    }

    @Override
    public void deleteTypeObjetById(String id) {
        typeObjetRepository.deleteById(id);
    }

    @Override
    public TypeObjet getTypeObjetById(String id) {
        return typeObjetRepository.findById(id).isPresent() ? typeObjetRepository.findById(id).get() : null;
    }

    @Override
    public List<TypeObjet> getAllTypeObjets() {
        return typeObjetRepository.findAll();
    }


//    @Override
//    public TypeObjet ajouterTypeObjet(
//            String codeTypeObjet,
//            String libelleTypeObjet,
//            Sections codeSection
//    ) {
//
//        TypeObjet typeObjet = new TypeObjet();
//
//        typeObjet.setCodeTypeObjet(codeTypeObjet);
//        typeObjet.setLibelleTypeObjet(libelleTypeObjet);
//        typeObjet.setCodeSection(codeSection);
//
//        return typeObjetRepository.save(typeObjet);
//    }


}
