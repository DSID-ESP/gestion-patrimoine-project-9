package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.*;
import sn.douanes.services.BonPourService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class BonPourController {

    @Autowired
    BonPourService bonPourService;


    @GetMapping("/BonPours")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<BonPour>> getAllBonPours() {
        List<BonPour> bonPour = bonPourService.getAllBonPours();
        return new ResponseEntity<>(bonPour, OK);
    }


    @PostMapping("/AjouterBonPour")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public BonPour AjouterBonPour(@RequestBody BonPour bonPour) {
        // return BonPourService.saveBonPour(BonPour);
        return bonPourService.ajouterBonPour(bonPour.getDescriptionBonPour(), bonPour.getEtatBonPour(), bonPour.getCodeSection(), bonPour.getCodeUniteDouaniere(), bonPour.getNumeroCourrielOrigine(), bonPour.getDateCourrielOrigine(), bonPour.getObjectCourrielOrigine(), bonPour.getMatriculeAgent(), bonPour.getNumeroArriveBLM(), bonPour.getNumeroArriveDLF(), bonPour.getNumeroArriveSection(), bonPour.getDateArriveBLM(), bonPour.getDateArriveDLF(), bonPour.getDateArriveSection(), bonPour.getObservationBLM(), bonPour.getObservationDLF(), bonPour.getObservationSection());
    }


    @PutMapping("/ModifierBonPour")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public BonPour ModifierBonPour(@RequestBody BonPour b) {
        return bonPourService.updateBonPour(b);
    }

    @DeleteMapping("SupprimerBonPourById/{identifiantBonPour}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerBonPourById(@PathVariable("identifiantBonPour") String identifiantBonPour) {
        bonPourService.deleteBonPourById(identifiantBonPour);
    }

    @GetMapping("RecupererBonPourById/{identifiantBonPour}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public BonPour RecupererBonPourById(@PathVariable("identifiantBonPour") String identifiantBonPour) {
        return bonPourService.getBonPourById(identifiantBonPour);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
