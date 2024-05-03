package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.*;
import sn.douanes.services.DotationVehiculeService;
import sn.douanes.services.VehiculeService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class DotationVehiculeController {

    @Autowired
    DotationVehiculeService dotationVehiculeService;

    @Autowired
    VehiculeService vehiculeService;


    @GetMapping("/DotationVehicules")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<DotationVehicule>> getAllDotationVehicules() {
        List<DotationVehicule> dotationVehicule = dotationVehiculeService.getAllDotationVehicules();
        return new ResponseEntity<>(dotationVehicule, OK);
    }


    @PostMapping("/AjouterDotationVehicule")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public DotationVehicule AjouterDotationVehicule(@RequestBody DotationVehicule dotationVehicule) {
        return dotationVehiculeService.ajouterDotationVehicule(dotationVehicule.getIdentifiantDV(), dotationVehicule.getNumeroSerie(), dotationVehicule.getDateDotation(), dotationVehicule.getMatriculeAgent(), dotationVehicule.getCodeArticleBonSortie());
    }


    @PutMapping("/ModifierDotationVehicule")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public DotationVehicule ModifierDotationVehicule(@RequestBody DotationVehicule d) {
        return dotationVehiculeService.updateDotationVehicule(d);
    }

    @DeleteMapping("SupprimerDotationVehiculeById/{identifiantDV}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerDotationVehiculeById(@PathVariable("identifiantDV") String identifiantDV) {

        dotationVehiculeService.deleteDotationVehiculeById(identifiantDV);
    }



    @GetMapping("RecupererDotationVehiculeById/{identifiantDV}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public DotationVehicule RecupererDotationVehiculeById(
            @PathVariable("identifiantDV") String identifiantDV
    ) {
        return dotationVehiculeService.getDotationVehiculeById(identifiantDV);
    }

    @GetMapping("RecupererDotationVehiculeByNumeroSerie/{numeroSerie}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public DotationVehicule RecupererDotationVehiculeByNumeroSerie(
            @PathVariable("numeroSerie") String numeroSerie
    ) {
        Vehicule vehicule = vehiculeService.getVehiculeById(numeroSerie);
        return dotationVehiculeService.getDotationVehiculeByNumeroSerie(vehicule);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
