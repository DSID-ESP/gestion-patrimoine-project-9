package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.TypeUniteDouaniere;
import sn.douanes.services.TypeUniteDouaniereService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class TypeUniteDouaniereController {

    @Autowired
    TypeUniteDouaniereService typeUniteDouaniereService;


    @GetMapping("/TypeUniteDouanieres")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<TypeUniteDouaniere>> getAllTypeUniteDouanieres() {
        List<TypeUniteDouaniere> typeUniteDouaniere = typeUniteDouaniereService.getAllTypeUniteDouanieres();
        return new ResponseEntity<>(typeUniteDouaniere, OK);
    }

    @PostMapping("/AjouterTypeUniteDouaniere")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public TypeUniteDouaniere AjouterTypeUniteDouaniere(@RequestBody TypeUniteDouaniere typeUniteDouaniere) {
        return typeUniteDouaniereService.saveTypeUniteDouaniere(typeUniteDouaniere);
    }


    @PutMapping("/ModifierTypeUniteDouaniere")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public TypeUniteDouaniere ModifierTypeUniteDouaniere(@RequestBody TypeUniteDouaniere t) {

        return typeUniteDouaniereService.updateTypeUniteDouaniere(t);
    }

    @DeleteMapping("SupprimerTypeUniteDouaniereById/{codeTypeUniteDouaniere}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerTypeUniteDouaniereById(@PathVariable("codeTypeUniteDouaniere") String codeTypeUniteDouaniere) {
        typeUniteDouaniereService.deleteTypeUniteDouaniereById(codeTypeUniteDouaniere);
    }


    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }


}
