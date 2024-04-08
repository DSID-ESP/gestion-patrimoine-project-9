package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.MarqueArme;
import sn.douanes.services.MarqueArmeService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class MarqueArmeController {

    @Autowired
    MarqueArmeService marqueArmeService;


    @GetMapping("/MarqueArmes")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<MarqueArme>> getAllMarqueArmes() {
        List<MarqueArme> marqueArme = marqueArmeService.getAllMarqueArmes();
        return new ResponseEntity<>(marqueArme, OK);
    }

    @PostMapping("/AjouterMarqueArme")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public MarqueArme AjouterMarqueArme(@RequestBody MarqueArme m) {
        return marqueArmeService.saveMarqueArme(m);
    }

    @PutMapping("/ModifierMarqueArme")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public MarqueArme ModifierMarqueArme(@RequestBody MarqueArme m) {

        return marqueArmeService.updateMarqueArme(m);
    }

    @DeleteMapping("SupprimerMarqueArmeById/{codeMarqueArme}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerMarqueArmeById(@PathVariable("codeMarqueArme") String codeMarqueArme) {
        marqueArmeService.deleteMarqueArmeById(codeMarqueArme);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }


}
