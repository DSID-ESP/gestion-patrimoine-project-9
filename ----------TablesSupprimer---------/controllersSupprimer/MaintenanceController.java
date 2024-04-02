package sn.douanes.controllersSupprimer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.servicesSupprimer.MaintenanceService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
////@RequestMapping(path = { "/", "/user"})
//@RequestMapping( "/")
//@CrossOrigin("http://localhost:4200")
public class MaintenanceController {

    @Autowired
    MaintenanceService maintenanceService;


    @GetMapping("/Maintenances")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<Maintenance>> getAllMaintenances() {
        List<Maintenance> maintenance = maintenanceService.getAllMaintenances();
        return new ResponseEntity<>(maintenance, OK);
    }

    @PostMapping("/AjouterMaintenance")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Maintenance AjouterMaintenance(@RequestBody Maintenance m) {
        return maintenanceService.saveMaintenance(m);
    }

    @PutMapping("/ModifierMaintenance")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Maintenance ModifierMaintenance(@RequestBody Maintenance m) {
        return maintenanceService.updateMaintenance(m);
    }

    @DeleteMapping("SupprimerMaintenanceById/{id}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerMaintenanceById(@PathVariable("id") String maintenance ) {
        maintenanceService.deleteMaintenanceById(maintenance);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
