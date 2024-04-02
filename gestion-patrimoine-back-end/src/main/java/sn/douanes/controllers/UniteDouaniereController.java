package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.UniteDouaniere;
import sn.douanes.services.UniteDouaniereService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class UniteDouaniereController {

    @Autowired
    UniteDouaniereService uniteDouaniereService;


    @GetMapping("/UniteDouanieres")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<UniteDouaniere>> getAllUniteDouanieres() {
        List<UniteDouaniere> uniteDouaniere = uniteDouaniereService.getAllUniteDouanieres();
        return new ResponseEntity<>(uniteDouaniere, OK);
    }

    @PostMapping("/AjouterUniteDouaniere")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public UniteDouaniere AjouterUniteDouaniere(@RequestBody UniteDouaniere uniteDouaniere) {
        return uniteDouaniereService.saveUniteDouaniere(uniteDouaniere);
    }



    @PutMapping("/ModifierUniteDouaniere")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public UniteDouaniere ModifierUniteDouaniere(@RequestBody UniteDouaniere u) {

        return uniteDouaniereService.updateUniteDouaniere(u);
    }

    @DeleteMapping("SupprimerUniteDouaniereById/{id}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerUniteDouaniereById(@PathVariable("id") String codeUniteDouaniere) {
        uniteDouaniereService.deleteUniteDouaniereById(codeUniteDouaniere);
    }

    @GetMapping("RecupererUniteDouaniereById/{codeUniteDouaniere}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public UniteDouaniere RecupererUniteDouaniereById(@PathVariable("codeUniteDouaniere") String codeUniteDouaniere) {
        return uniteDouaniereService.getUniteDouaniereById(codeUniteDouaniere);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }


}
