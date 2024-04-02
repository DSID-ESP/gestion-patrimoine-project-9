package sn.douanes.controllersSupprimer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.servicesSupprimer.VidangeService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
////@RequestMapping(path = { "/", "/user"})
//@RequestMapping( "/")
//@CrossOrigin("http://localhost:4200")
public class VidangeController {

    @Autowired
    VidangeService vidangeService;


    @GetMapping("/Vidanges")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<Vidange>> getAllVidanges() {
        List<Vidange> vidange = vidangeService.getAllVidanges();
        return new ResponseEntity<>(vidange, OK);
    }

    @PostMapping("/AjouterVidange")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Vidange AjouterVidange(@RequestBody Vidange v) {
        return vidangeService.saveVidange(v);
    }

    @PutMapping("/ModifierVidange")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public Vidange ModifierVidange(@RequestBody Vidange v) {
        return vidangeService.updateVidange(v);
    }

    @DeleteMapping("SupprimerVidangeById/{id}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerVidangeById(@PathVariable("id") String numeroImmatriculation) {
        vidangeService.deleteVidangeById(numeroImmatriculation);
    }


    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }


}
