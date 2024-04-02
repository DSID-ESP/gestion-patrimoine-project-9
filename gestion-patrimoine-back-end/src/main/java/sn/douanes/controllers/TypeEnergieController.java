package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.TypeEnergie;
import sn.douanes.services.TypeEnergieService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class TypeEnergieController {

    @Autowired
    TypeEnergieService typeEnergieService;

    @GetMapping("/TypeEnergies")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<TypeEnergie>> getAllTypeEnergies() {
        List<TypeEnergie> typeEnergie = typeEnergieService.getAllTypeEnergies();
        return new ResponseEntity<>(typeEnergie, OK);
    }

    @PostMapping("/AjouterTypeEnergie")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public TypeEnergie AjouterTypeEnergie(@RequestBody TypeEnergie typeEnergie) {
        return typeEnergieService.saveTypeEnergie(typeEnergie);
    }

    @PutMapping("/ModifierTypeEnergie")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public TypeEnergie ModifierTypeEnergie(@RequestBody TypeEnergie t) {
        return typeEnergieService.updateTypeEnergie(t);
    }

    @DeleteMapping("SupprimerTypeEnergieById/{codeTypeEnergie}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerTypeEnergieById(@PathVariable("codeTypeEnergie") String codeTypeEnergie) {
        typeEnergieService.deleteTypeEnergieById(codeTypeEnergie);
    }


    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }


}
