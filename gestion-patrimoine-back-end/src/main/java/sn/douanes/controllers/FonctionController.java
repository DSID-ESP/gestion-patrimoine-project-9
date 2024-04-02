package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.Fonctions;
import sn.douanes.entities.HttpResponse;
import sn.douanes.services.FonctionService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class FonctionController {

    @Autowired
    FonctionService fonctionAgentService;


    @GetMapping("/Fonctions")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<Fonctions>> getAllFonctionAgents() {
        List<Fonctions> fonctions = fonctionAgentService.getAllFonctions();
        return new ResponseEntity<>(fonctions, OK);
    }

    @PostMapping("/AjouterFonction")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Fonctions AjouterFonctionAgent(@RequestBody Fonctions fonctionAgent) {
        return fonctionAgentService.saveFonctions(fonctionAgent);
    }


    @PutMapping("/ModifierFonction")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Fonctions ModifierFonctionAgent(@RequestBody Fonctions f) {
        return fonctionAgentService.updateFonctions(f);
    }

    @DeleteMapping("SupprimerFonctionById/{codeFonction}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerFonctionAgentById(@PathVariable("codeFonction") String codeFonction) {
        fonctionAgentService.deleteFonctionsById(codeFonction);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
