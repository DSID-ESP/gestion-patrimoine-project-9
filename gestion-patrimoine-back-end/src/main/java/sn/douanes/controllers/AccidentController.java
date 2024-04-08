package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.HttpResponse;
import sn.douanes.entities.Accident;
import sn.douanes.entities.Reparation;
import sn.douanes.services.AccidentService;

import java.sql.Date;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class AccidentController {

    @Autowired
    AccidentService accidentService;


    @GetMapping("/Accidents")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR', 'CHEF SECTION ARMEMENT', 'AGENT SECTION ARMEMENT', 'CHEF SECTION GARAGE', 'AGENT SECTION GARAGE', 'CHEF SECTION MATÉRIEL', 'AGENT SECTION MATÉRIEL', 'CHEF BLM', 'DIRECTEUR DLF')")
    public ResponseEntity<List<Accident>> getAllAccidents() {
        List<Accident> accident = accidentService.getAllAccidents();
        return new ResponseEntity<>(accident, OK);
    }

    @PostMapping("/AjouterAccident")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR', 'CHEF SECTION ARMEMENT', 'AGENT SECTION ARMEMENT', 'CHEF SECTION GARAGE', 'AGENT SECTION GARAGE', 'CHEF SECTION MATÉRIEL', 'AGENT SECTION MATÉRIEL', 'CHEF BLM', 'DIRECTEUR DLF')")
    public Accident AjouterAccident(@RequestBody Accident accident) {
        return accidentService.ajouterAccident(accident.getIdentifiantMaintenance(), accident.getDateIncident(), accident.getLieuIncident(), accident.getCommentaireIncident(), accident.getNombreDeces(), accident.getNombreBlesse());
    }


    @PutMapping("/ModifierAccident")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR', 'CHEF SECTION ARMEMENT', 'AGENT SECTION ARMEMENT', 'CHEF SECTION GARAGE', 'AGENT SECTION GARAGE', 'CHEF SECTION MATÉRIEL', 'AGENT SECTION MATÉRIEL', 'CHEF BLM', 'DIRECTEUR DLF')")
    public Accident ModifierAccident(@RequestBody Accident a) {
        return accidentService.updateAccident(a);
    }
    

    @DeleteMapping("SupprimerAccidentById/{identifiantMaintenance}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR', 'CHEF SECTION ARMEMENT', 'AGENT SECTION ARMEMENT', 'CHEF SECTION GARAGE', 'AGENT SECTION GARAGE', 'CHEF SECTION MATÉRIEL', 'AGENT SECTION MATÉRIEL', 'CHEF BLM', 'DIRECTEUR DLF')")
    public void SupprimerAccidentById(@PathVariable("identifiantMaintenance") String identifiantMaintenance) {
        accidentService.deleteAccidentById(identifiantMaintenance);
    }


    @GetMapping("RecupererAccidentById/{identifiantMaintenance}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR', 'CHEF SECTION ARMEMENT', 'AGENT SECTION ARMEMENT', 'CHEF SECTION GARAGE', 'AGENT SECTION GARAGE', 'CHEF SECTION MATÉRIEL', 'AGENT SECTION MATÉRIEL', 'CHEF BLM', 'DIRECTEUR DLF')")
    public Accident RecupererAccidentById(@PathVariable("identifiantMaintenance") String identifiantMaintenance) {
        return accidentService.getAccidentById(identifiantMaintenance);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }


}
