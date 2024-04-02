package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.BonEntree;
import sn.douanes.entities.Controle;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.Vehicule;
import sn.douanes.services.ControleService;

import java.sql.Timestamp;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class ControleController {

    @Autowired
    ControleService controleService;


    @GetMapping("/Controles")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<Controle>> getAllControles() {
        List<Controle> controle = controleService.getAllControles();
        return new ResponseEntity<>(controle, OK);
    }

    @PostMapping("/AjouterControle")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Controle AjouterControle(@RequestBody Controle c) {
        return controleService.saveControle(c);
    }

    @PutMapping("/ModifierControle")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Controle ModifierControle(@RequestBody Controle c) {
        return controleService.updateControle(c);
    }


    @DeleteMapping("SupprimerControleById/{numeroSerie}/{dateControle}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerArticleBonEntree(
            @PathVariable("numeroSerie") String numeroSerie,
            @PathVariable("dateControle") Timestamp dateControle

    ) {
        controleService.deleteControleById(numeroSerie, dateControle);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
