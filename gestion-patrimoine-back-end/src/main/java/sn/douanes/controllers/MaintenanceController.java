package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.Accident;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.Maintenance;
import sn.douanes.services.MaintenanceService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class MaintenanceController {

    @Autowired
    MaintenanceService maintenanceService;


    @GetMapping("/Maintenances")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<Maintenance>> getAllMaintenances() {
        List<Maintenance> maintenance = maintenanceService.getAllMaintenances();
        return new ResponseEntity<>(maintenance, OK);
    }

//    @PostMapping("/AjouterMaintenance")
//    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
//    public Maintenance AjouterMaintenance(@RequestBody Maintenance maintenance) {
//        return maintenanceService.ajouterMaintenance(maintenance.getIdentifiantMaintenance(), maintenance.getNumeroSerie(), maintenance.getTypeMaintenance(), maintenance.getObservationMaintenance());
//    }

    @PostMapping("/AjouterMaintenance")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Maintenance AjouterMaintenance(@RequestBody Maintenance maintenance) {
        return maintenanceService.ajouterMaintenance(maintenance.getIdentifiantMaintenance(), maintenance.getNumeroSerie(),maintenance.getEtatMaintenance(), maintenance.getTypeMaintenance(), maintenance.getObservationMaintenance());
    }
    

    @PutMapping("/ModifierMaintenance")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Maintenance ModifierMaintenance(@RequestBody Maintenance m) {
        return maintenanceService.updateMaintenance(m);
    }

    @PutMapping("/TerminerMaintenance")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Maintenance TerminerMaintenance(@RequestBody Maintenance m) {
        return maintenanceService.terminerMaintenance(m);
    }

    @DeleteMapping("SupprimerMaintenanceById/{identifiantMaintenance}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerMaintenanceById(@PathVariable("identifiantMaintenance") String identifiantMaintenance) {
        maintenanceService.deleteMaintenanceById(identifiantMaintenance);
    }


    @GetMapping("RecupererMaintenanceById/{identifiantMaintenance}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Maintenance RecupererMaintenanceById(@PathVariable("identifiantMaintenance") String identifiantMaintenance) {
        return maintenanceService.getMaintenanceById(identifiantMaintenance);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }


}
