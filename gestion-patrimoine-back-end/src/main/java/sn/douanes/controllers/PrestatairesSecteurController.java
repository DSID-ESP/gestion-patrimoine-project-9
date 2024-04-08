package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.Prestataires;
import sn.douanes.entities.PrestatairesSecteur;
import sn.douanes.entities.SecteurActivite;
import sn.douanes.services.PrestatairesSecteurService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class PrestatairesSecteurController {

    @Autowired
    PrestatairesSecteurService prestatairesSecteurService;


    @GetMapping("/PrestatairesSecteurs")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<PrestatairesSecteur>> getAllPrestatairesSecteurs() {
        List<PrestatairesSecteur> prestatairesSecteur = prestatairesSecteurService.getAllPrestatairesSecteur();
        return new ResponseEntity<>(prestatairesSecteur, OK);
    }

    @PostMapping("/AjouterPrestatairesSecteurs")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public PrestatairesSecteur AjouterPrestatairesSecteur(@RequestBody PrestatairesSecteur prestatairesSecteur) {
        return prestatairesSecteurService.savePrestatairesSecteur(prestatairesSecteur);
    }


    @PutMapping("/ModifierPrestatairesSecteur")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public PrestatairesSecteur ModifierPrestatairesSecteur(@RequestBody PrestatairesSecteur p) {

        return prestatairesSecteurService.updatePrestatairesSecteur(p);
    }

    @DeleteMapping("SupprimerPrestatairesSecteurById/{id}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerPrestatairesSecteurById(
            @PathVariable("ninea") Prestataires ninea,
            @PathVariable("codeSecteurActivite") SecteurActivite codeSecteurActivite
    ) {
        prestatairesSecteurService.deletePrestatairesSecteurById(ninea, codeSecteurActivite);
    }


    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
