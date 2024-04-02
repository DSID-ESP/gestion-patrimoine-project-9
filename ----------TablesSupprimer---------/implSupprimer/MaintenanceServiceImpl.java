package sn.douanes.services.implSupprimer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.douanes.repositoriesSupprimer.MaintenanceRepository;
import sn.douanes.servicesSupprimer.MaintenanceService;

import java.util.List;


@Service
public class MaintenanceServiceImpl implements MaintenanceService {

    @Autowired
    MaintenanceRepository maintenanceRepository;

    @Override
    public Maintenance saveMaintenance(Maintenance m) {
        return maintenanceRepository.save(m);
    }

    @Override
    public Maintenance updateMaintenance(Maintenance m) {
        return maintenanceRepository.save(m);
    }

    @Override
    public void deleteMaintenance(Maintenance m) {
        maintenanceRepository.delete(m);
    }

    @Override
    public void deleteMaintenanceById(String id) {
        maintenanceRepository.deleteById(id);
    }

    @Override
    public Maintenance getMaintenance(String id) {
        return maintenanceRepository.findById(id).get();
    }

    @Override
    public List<Maintenance> getAllMaintenances() {
        return maintenanceRepository.findAll();
    }



}
