package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.BonPour;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.Reparation;
import sn.douanes.services.ReparationService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class ReparationController {

    @Autowired
    ReparationService reparationService;


    @GetMapping("/Reparations")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<Reparation>> getAllReparations() {
        List<Reparation> reparation = reparationService.getAllReparations();
        return new ResponseEntity<>(reparation, OK);
    }

    @PostMapping("/AjouterReparation")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Reparation AjouterReparation(@RequestBody Reparation r) {
        return reparationService.saveReparation(r);
    }

    @PutMapping("/ModifierReparation")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Reparation ModifierReparation(@RequestBody Reparation r) {
        return reparationService.updateReparation(r);
    }

    @DeleteMapping("SupprimerReparationById/{identifiantMaintenance}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerReparationById(@PathVariable("identifiantMaintenance") String identifiantMaintenance) {
        reparationService.deleteReparationById(identifiantMaintenance);
    }


    @GetMapping("RecupererReparationById/{identifiantMaintenance}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Reparation RecupererReparationById(@PathVariable("identifiantMaintenance") String identifiantMaintenance) {
        return reparationService.getReparationById(identifiantMaintenance);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }


}
