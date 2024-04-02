package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.MarqueVehicule;
import sn.douanes.services.MarqueVehiculeService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class MarqueVehiculeController {

    @Autowired
    MarqueVehiculeService marqueVehiculeService;


    @GetMapping("/MarqueVehicules")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<MarqueVehicule>> getAllMarqueVehicules() {
        List<MarqueVehicule> marqueVehicule = marqueVehiculeService.getAllMarqueVehicules();
        return new ResponseEntity<>(marqueVehicule, OK);
    }

    @PostMapping("/AjouterMarqueVehicule")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public MarqueVehicule AjouterMarqueVehicule(@RequestBody MarqueVehicule marqueVehicule) {
        return marqueVehiculeService.saveMarqueVehicule(marqueVehicule);
    }


    @PutMapping("/ModifierMarqueVehicule")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public MarqueVehicule ModifierMarqueVehicule(@RequestBody MarqueVehicule t) {
        return marqueVehiculeService.updateMarqueVehicule(t);
    }

    @DeleteMapping("SupprimerMarqueVehiculeById/{codeMarqueVH}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerMarqueVehiculeById(@PathVariable("codeMarqueVH") String codeMarqueVH) {
        marqueVehiculeService.deleteMarqueVehiculeById(codeMarqueVH);
    }


    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
