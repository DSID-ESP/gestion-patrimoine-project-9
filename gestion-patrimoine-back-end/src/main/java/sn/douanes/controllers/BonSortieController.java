package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.BonSortie;
import sn.douanes.entities.HttpResponse;
import sn.douanes.services.BonSortieService;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class BonSortieController {

    @Autowired
    BonSortieService bonSortieService;

    @GetMapping("/BonSorties")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<BonSortie>> getAllBonDeSorties() {
        List<BonSortie> BonDeSortie = bonSortieService.getAllBonSorties();
        return new ResponseEntity<>(BonDeSortie, OK);
    }



    @PostMapping("/AjouterBonSortie")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public BonSortie AjouterBonSortie(@RequestBody BonSortie bonSortie) {
        // return BonDeSortieService.saveBonDeSortie(BonDeSortie);
        return bonSortieService.ajouterBonSortie(bonSortie.getNumeroBonSortie(), bonSortie.getDescriptionBonSortie(),bonSortie.getDateBonSortie(), bonSortie.getMatriculeAgent(), bonSortie.getIdentifiantBonPour());
    }


    @PutMapping("/ModifierBonSortie")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public BonSortie ModifierBonSortie(@RequestBody BonSortie b) {
        return bonSortieService.updateBonSortie(b);
    }

    @DeleteMapping("SupprimerBonSortieById/{identifiantBonSortie}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerBonSortieById(@PathVariable("identifiantBonSortie") String identifiantBonSortie) {
        bonSortieService.deleteBonSortieById(identifiantBonSortie);
    }

    @GetMapping("RecupererBonSortieById/{identifiantBonSortie}")
    // @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public BonSortie RecupererBonSortieById(@PathVariable("identifiantBonSortie") String identifiantBonSortie) {
        return bonSortieService.getBonSortieById(identifiantBonSortie);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
