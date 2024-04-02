package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.Pays;
import sn.douanes.services.PaysService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class PaysController {

    @Autowired
    PaysService paysService;


    @GetMapping("/Pays")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<Pays>> getAllPays() {
        List<Pays> pays = paysService.getAllPays();
        return new ResponseEntity<>(pays, OK);
    }


    @PostMapping("/AjouterPays")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Pays AjouterPays(@RequestBody Pays pays) {
        return paysService.savePays(pays);
    }



    @PutMapping("/ModifierPays")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Pays ModifierPays(@RequestBody Pays p) {
        return paysService.updatePays(p);
    }

    @DeleteMapping("SupprimerPaysById/{codePays}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerPaysById(@PathVariable("codePays") String codePays) {
        paysService.deletePaysById(codePays);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
