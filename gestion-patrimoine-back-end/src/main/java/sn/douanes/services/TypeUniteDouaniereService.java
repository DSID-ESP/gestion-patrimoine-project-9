package sn.douanes.services;

import sn.douanes.entities.TypeUniteDouaniere;

import java.util.List;

public interface TypeUniteDouaniereService {

    TypeUniteDouaniere saveTypeUniteDouaniere(TypeUniteDouaniere t);
    TypeUniteDouaniere updateTypeUniteDouaniere(TypeUniteDouaniere t);
    void deleteTypeUniteDouaniere(TypeUniteDouaniere t);
    void deleteTypeUniteDouaniereById(String id);
    TypeUniteDouaniere getTypeUniteDouaniereById(String id);
    List<TypeUniteDouaniere> getAllTypeUniteDouanieres();


}
