package sn.douanes.services;

import sn.douanes.entities.Maintenance;
import sn.douanes.entities.BordereauLivraison;
import sn.douanes.entities.Vehicule;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

public interface MaintenanceService {

    Maintenance saveMaintenance(Maintenance m);
    Maintenance updateMaintenance(Maintenance m);
    void deleteMaintenance(Maintenance m);
    void deleteMaintenanceById(String id);
    Maintenance getMaintenanceById(String id);
    List<Maintenance> getAllMaintenances();

    Maintenance ajouterMaintenance(String identifiantMaintenance, Vehicule numeroSerie, String typeMaintenance, String observationMaintenance);


}
