package sn.douanes.servicesSupprimer;


import java.util.List;

public interface MaintenanceService {

    Maintenance saveMaintenance(Maintenance m);
    Maintenance updateMaintenance(Maintenance m);
    void deleteMaintenance(Maintenance m);
    void deleteMaintenanceById(String id);
    Maintenance getMaintenance(String id);
    List<Maintenance> getAllMaintenances();


}
