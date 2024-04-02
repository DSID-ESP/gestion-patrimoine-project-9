package sn.douanes.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.LieuStockageVehicule;
import sn.douanes.services.LieuStockageVehiculeService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping( "/api")
public class LieuStockageVehiculeController {

    @Autowired
    LieuStockageVehiculeService lieuStockageVehiculeService;

    @GetMapping("/LieuStockageVehicules")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<LieuStockageVehicule>> getAllTypeEnergies() {
        List<LieuStockageVehicule> lieuStockageVehicule = lieuStockageVehiculeService.getAllLieuStockageVehicules();
        return new ResponseEntity<>(lieuStockageVehicule, OK);
    }

    @PostMapping("/AjouterLieuStockageVehicule")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public LieuStockageVehicule AjouterLieuStockageVehicule(@RequestBody LieuStockageVehicule lieuStockageVehicule) {
        return lieuStockageVehiculeService.saveLieuStockageVehicule(lieuStockageVehicule);
    }


    @PutMapping("/ModifierLieuStockageVehicule")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public LieuStockageVehicule ModifierLieuStockageVehicule(@RequestBody LieuStockageVehicule l) {
        return lieuStockageVehiculeService.updateLieuStockageVehicule(l);
    }

    @DeleteMapping("SupprimerLieuStockageVehiculeById/{id}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerLieuStockageVehiculeById(@PathVariable("id") String codeLieuVH) {
        lieuStockageVehiculeService.deleteLieuStockageVehiculeById(codeLieuVH);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
