package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.Sections;
import sn.douanes.entities.TypeObjet;
import sn.douanes.services.TypeObjetService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class TypeObjetController {

    @Autowired
    TypeObjetService typeObjetService;


    @GetMapping("/TypeObjets")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<TypeObjet>> getAllTypeObjets() {
        List<TypeObjet> typeObjet = typeObjetService.getAllTypeObjets();
        return new ResponseEntity<>(typeObjet, OK);
    }

    @PostMapping("/AjouterTypeObjet")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public TypeObjet AjouterTypeObjet(@RequestBody TypeObjet typeObjet) {
        return typeObjetService.saveTypeObjet(typeObjet);
    }


    @PutMapping("/ModifierTypeObjet")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public TypeObjet ModifierTypeObjet(@RequestBody TypeObjet t) {

        return typeObjetService.updateTypeObjet(t);
    }

    @DeleteMapping("SupprimerTypeObjetById/{codeTypeObjet}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerTypeObjetById(@PathVariable("codeTypeObjet") String codeTypeObjet) {
        typeObjetService.deleteTypeObjetById(codeTypeObjet);
    }


    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }


}
