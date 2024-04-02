package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.TypeVehicule;
import sn.douanes.services.TypeVehiculeService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class TypeVehiculeController {

    @Autowired
    TypeVehiculeService typeVehiculeService;


    @GetMapping("/TypeVehicules")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<TypeVehicule>> getAllTypeVehicules() {
        List<TypeVehicule> typeVehicule = typeVehiculeService.getAllTypeVehicules();
        return new ResponseEntity<>(typeVehicule, OK);
    }

    @PostMapping("/AjouterTypeVehicule")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public TypeVehicule AjouterTypeVehicule(@RequestBody TypeVehicule typeVehicule) {
        return typeVehiculeService.saveTypeVehicule(typeVehicule);
    }

    @PutMapping("/ModifierTypeVehicule")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public TypeVehicule ModifierTypeVehicule(@RequestBody TypeVehicule t) {
        return typeVehiculeService.updateTypeVehicule(t);
    }

    @DeleteMapping("SupprimerTypeVehiculeById/{codeTypeVehicule}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerTypeVehiculeById(@PathVariable("codeTypeVehicule") String codeTypeVehicule) {
        typeVehiculeService.deleteTypeVehiculeById(codeTypeVehicule);
    }


    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }


}
