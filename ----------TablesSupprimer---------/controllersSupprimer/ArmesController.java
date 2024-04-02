package sn.douanes.controllersSupprimer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.servicesSupprimer.ArmesService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
public class ArmesController {

    @Autowired
    ArmesService armesService;

    @GetMapping("/Armes")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<Armes>> getAllArmes() {
        List<Armes> armes = armesService.getAllArmes();
        return new ResponseEntity<>(armes, OK);
    }

    @PostMapping("/AjouterArmes")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Armes AjouterArmes(@RequestBody Armes a) {
        return armesService.saveArmes(a);
    }

    @PutMapping("/ModifierArmes")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Armes ModifierArmes(@RequestBody Armes a) {
        return armesService.updateArmes(a);
    }

    @DeleteMapping("SupprimerArmesById/{id}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerArmesById(@PathVariable("id") String numeroArme ) {
        armesService.deleteArmesById(numeroArme);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }


}
