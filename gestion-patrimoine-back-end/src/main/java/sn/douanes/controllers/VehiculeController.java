package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.*;
import sn.douanes.services.VehiculeService;

import java.sql.Date;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;



@RestController
@RequestMapping( "/api")
public class VehiculeController {

    public static final String VEHICULE_DELETED_SUCCESSFULLY = "Suppression réussie de ";

    @Autowired
    VehiculeService vehiculeService;

    @GetMapping("/Vehicules")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<Vehicule>> listeVehicules() {
        List<Vehicule> vehicules = vehiculeService.getAllVehicules();
        return new ResponseEntity<>(vehicules, OK);
    }


    @PostMapping("/AjouterVehicule")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Vehicule AjouterVehicule(@RequestBody Vehicule vehicule) {

        return vehiculeService.ajouterVehicule(vehicule.getNumeroSerie(), vehicule.getNumeroImmatriculation(), vehicule.getCodeArticleBonEntree(), vehicule.getCodeMarque(), vehicule.getCodeTypeEnergie(), vehicule.getNumeroCarteGrise(), vehicule.getCodeTypeVehicule(), vehicule.getModele(), vehicule.getCodePays(), vehicule.getDateMiseEnCirculation());
    }




    @PutMapping("/ModifierVehicule")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Vehicule ModifierVehicule(@RequestBody Vehicule v) {
        
        return vehiculeService.updateVehicule(v);
    }


    @DeleteMapping("SupprimerVehiculeById/{numeroSerie}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<HttpResponse> SupprimerPrestatairesById(@PathVariable("numeroSerie") String numeroSerie) {

        vehiculeService.deleteVehiculeById(numeroSerie);
        return response(OK, VEHICULE_DELETED_SUCCESSFULLY + numeroSerie);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message),
                httpStatus
        );
    }
}
