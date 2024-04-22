package sn.douanes.services;

import sn.douanes.entities.Reparation;
import sn.douanes.entities.Vehicule;

import java.sql.Timestamp;
import java.util.List;

public interface ReparationService {

    Reparation saveReparation(Reparation r);
    Reparation updateReparation(Reparation r);
    void deleteReparation(Reparation r);
    void deleteReparationById(String identifiantMaintenance);
    Reparation getReparationById(String identifiantMaintenance);
    List<Reparation> getAllReparations();


    Reparation ajouterReparation(String identifiantMaintenance, String motifReparation);


}
