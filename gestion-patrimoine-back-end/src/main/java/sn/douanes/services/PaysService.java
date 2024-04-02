package sn.douanes.services;

import sn.douanes.entities.Pays;

import java.util.List;

public interface PaysService {

    Pays savePays(Pays p);
    Pays updatePays(Pays p);
    void deletePays(Pays p);
    void deletePaysById(String id);
    Pays getPaysById(String id);
    List<Pays> getAllPays();



}
