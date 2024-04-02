package sn.douanes.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.entities.TypeArme;
import sn.douanes.repositories.TypeArmeRepository;
import sn.douanes.services.TypeArmeService;

import java.util.List;


@Service
public class TypeArmeServiceImpl implements TypeArmeService {

    @Autowired
    TypeArmeRepository typeArmeRepository;

    @Override
    public TypeArme saveTypeArme(TypeArme t) {
        return typeArmeRepository.save(t);
    }

    @Override
    public TypeArme updateTypeArme(TypeArme t) {
        return typeArmeRepository.save(t);
    }

    @Override
    public void deleteTypeArme(TypeArme t) {
        typeArmeRepository.delete(t);
    }

    @Override
    public void deleteTypeArmeById(String id) {
        typeArmeRepository.deleteById(id);
    }

    @Override
    public TypeArme getTypeArme(String id) {
        return typeArmeRepository.findById(id).get();
    }

    @Override
    public List<TypeArme> getAllTypeArmes() {
        return typeArmeRepository.findAll();
    }



}
