package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.TypeEnergie;
import sn.douanes.repositories.TypeEnergieRepository;
import sn.douanes.services.TypeEnergieService;

import java.util.List;


@Service
public class TypeEnergieServiceImpl implements TypeEnergieService {

    @Autowired
    TypeEnergieRepository typeEnergieRepository;

    @Override
    public TypeEnergie saveTypeEnergie(TypeEnergie t) {
        return typeEnergieRepository.save(t);
    }

    @Override
    public TypeEnergie updateTypeEnergie(TypeEnergie t) {
        return typeEnergieRepository.save(t);
    }

    @Override
    public void deleteTypeEnergie(TypeEnergie t) {
        typeEnergieRepository.delete(t);
    }

    @Override
    public void deleteTypeEnergieById(String id) {
        typeEnergieRepository.deleteById(id);
    }

    @Override
    public TypeEnergie getTypeEnergieById(String id) {
        return typeEnergieRepository.findById(id).isPresent() ? typeEnergieRepository.findById(id).get() : null;
    }

    @Override
    public List<TypeEnergie> getAllTypeEnergies() {
        return typeEnergieRepository.findAll();
    }


//    @Override
//    public TypeEnergie ajouterTypeEnergie(
//            String codeTypeEnergie,
//            String libelleTypeEnergie
//    ) {
//
//        TypeEnergie typeEnergie = new TypeEnergie();
//
//        typeEnergie.setCodeTypeEnergie(codeTypeEnergie);
//        typeEnergie.setLibelleTypeEnergie(libelleTypeEnergie);
//
//
//        return typeEnergieRepository.save(typeEnergie);
//    }



}
