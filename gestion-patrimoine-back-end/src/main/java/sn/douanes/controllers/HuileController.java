package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.Huile;
import sn.douanes.services.HuileService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class HuileController {

    @Autowired
    HuileService huileService;


    @GetMapping("/Huiles")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<Huile>> getAllHuile() {
        List<Huile> huile = huileService.getAllHuile();
        return new ResponseEntity<>(huile, OK);
    }


    @PostMapping("/AjouterHuile")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Huile AjouterHuile(@RequestBody Huile h) {
        return huileService.saveHuile(h);
    }



    @PutMapping("/ModifierHuile")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Huile ModifierHuile(@RequestBody Huile h) {
        return huileService.updateHuile(h);
    }

    @DeleteMapping("SupprimerHuileById/{identifiantHuile}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerHuileById(@PathVariable("identifiantHuile") String identifiantHuile) {
        huileService.deleteHuileById(identifiantHuile);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
