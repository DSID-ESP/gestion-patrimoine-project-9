package sn.douanes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sn.douanes.entities.BonEntree;
import sn.douanes.entities.BordereauLivraison;
import sn.douanes.entities.HttpResponse;
import sn.douanes.services.BonEntreeService;
import sn.douanes.services.BordereauLivraisonService;

import java.sql.Date;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;


@RestController
@RequestMapping( "/api")
public class BonEntreeController {

    @Autowired
    BonEntreeService bonEntreeService;
    @Autowired
    BordereauLivraisonService bordereauLivraisonService;


    @GetMapping("/BonEntrees")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public ResponseEntity<List<BonEntree>> getAllBonEntrees() {
        List<BonEntree> bonEntree = bonEntreeService.getAllBonEntrees();
        return new ResponseEntity<>(bonEntree, OK);
    }


    @PostMapping("/AjouterBonEntree")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public BonEntree AjouterBonEntree(@RequestBody BonEntree bonEntree) {
        // return bonEntreeService.saveBonEntree(bonEntree);
        return bonEntreeService.ajouterBonEntree(bonEntree.getNumeroBE(), bonEntree.getDateBonEntree(), bonEntree.getIdentifiantBL(), bonEntree.getLibelleBonEntree(), bonEntree.getObservationBonEntree());
    }


//    @PostMapping("/AjouterRequestParamBonEntree")
//    public ResponseEntity<BonEntree> ajouterBonEntree (
//        @RequestParam("numeroBE") String numeroBE,
//        @RequestParam("libelleBonEntree") String libelleBonEntree,
//        @RequestParam("dateBonEntree") String dateBonEntree,
//        @RequestParam("observationBonEntree") String observationBonEntree,
//        @RequestParam("identifiantBL") String identifiantBL
//    ) {
//        BordereauLivraison bordereauLivraison = bordereauLivraisonService.getBordereauLivraisonById(identifiantBL);
//
//        BonEntree bonEntree = bonEntreeService.ajouterBonEntree(numeroBE,  libelleBonEntree,  Date.valueOf(dateBonEntree), observationBonEntree, bordereauLivraison);
//        return new ResponseEntity<>(bonEntree, OK);
//    }


    @PutMapping("/ModifierBonEntree")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public BonEntree ModifierBonEntree(@RequestBody BonEntree b) {
        return bonEntreeService.updateBonEntree(b);
    }

    @DeleteMapping("SupprimerBonEntreeById/{identifiantBonEntree}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public void SupprimerBonEntreeById(@PathVariable("identifiantBonEntree") String identifiantBonEntree) {
        bonEntreeService.deleteBonEntreeById(identifiantBonEntree);
    }

    @GetMapping("RecupererBonEntreeById/{identifiantBonEntree}")
    @PreAuthorize("hasAnyAuthority('ADMINISTRATEUR')")
    public BonEntree RecupererBonEntreeById(@PathVariable("identifiantBonEntree") String identifiantBonEntree) {
        return bonEntreeService.getBonEntreeById(identifiantBonEntree);
    }

    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(
                new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(), message), httpStatus
        );
    }

}
