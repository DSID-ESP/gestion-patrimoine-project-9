package sn.douanes.services;

import sn.douanes.entities.Sections;
import sn.douanes.entities.TypeObjet;

import java.util.List;

public interface TypeObjetService {

    TypeObjet saveTypeObjet(TypeObjet t);
    TypeObjet updateTypeObjet(TypeObjet t);
    void deleteTypeObjet(TypeObjet t);
    void deleteTypeObjetById(String id);
    TypeObjet getTypeObjetById(String id);
    List<TypeObjet> getAllTypeObjets();

}
